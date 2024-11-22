// src/context/UserProvider.jsx
import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import PropTypes from "prop-types";

export const UserProvider = ({ children }) => {

  const [userData, setUserData] = useState(() => {
    const storedUserData = JSON.parse(localStorage.getItem("usersData"));
    return storedUserData ? storedUserData[Object.keys(storedUserData)[0]] : null;
  });


  const [formData, setFormData] = useState(() => {
    return JSON.parse(localStorage.getItem("formData")) || null;
  });


  const [consumptionData, setConsumptionData] = useState(() => {
    return JSON.parse(localStorage.getItem("consumptionData")) || null;
  });


  useEffect(() => {
    if (userData) {
      const storedUsersData = JSON.parse(localStorage.getItem("usersData")) || {};
      const userId = Object.keys(storedUsersData)[0] || "defaultUserId";
      storedUsersData[userId] = userData;
      localStorage.setItem("usersData", JSON.stringify(storedUsersData));
    } else {
      localStorage.removeItem("usersData");
    }
  }, [userData]);


  useEffect(() => {
    if (formData) {
      localStorage.setItem("formData", JSON.stringify(formData));
    } else {
      localStorage.removeItem("formData");
    }
  }, [formData]);

 
  useEffect(() => {
    if (consumptionData) {
      localStorage.setItem("consumptionData", JSON.stringify(consumptionData));
    } else {
      localStorage.removeItem("consumptionData");
    }
  }, [consumptionData]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "usersData") {
        const storedUserData = JSON.parse(event.newValue);
        setUserData(storedUserData ? storedUserData[Object.keys(storedUserData)[0]] : null);
      }

      if (event.key === "formData") {
        setFormData(event.newValue ? JSON.parse(event.newValue) : null);
      }

      if (event.key === "consumptionData") {
        setConsumptionData(event.newValue ? JSON.parse(event.newValue) : null);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        formData,
        setFormData,
        consumptionData,
        setConsumptionData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;