import {  useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import PropTypes from 'prop-types';

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState(null);
    const [consumptionData, setConsumptionData] = useState(null);
  
    useEffect(() => {
      const storedUserData = JSON.parse(localStorage.getItem('usersData'));
      const storedFormData = JSON.parse(localStorage.getItem('formData'));
      const storedConsumptionData = JSON.parse(localStorage.getItem('consumptionData'));
  
      if (storedUserData) {
        const userId = Object.keys(storedUserData)[0]; 
        setUserData(storedUserData[userId]);
      }
  
      if (storedFormData) {
        setFormData(storedFormData);
      }
  
      if (storedConsumptionData) {
        setConsumptionData(storedConsumptionData);
      }
    }, []);
  
    return (
      <UserContext.Provider value={{ userData, formData, consumptionData, setFormData, setConsumptionData }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };