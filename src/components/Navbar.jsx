import { RiMenuFill, RiMenu3Fill, RiHomeFill, RiDashboardFill, RiMapPinTimeFill } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";
import { MdTipsAndUpdates } from "react-icons/md";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import SignUp from "./SignUp";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo_green_flow.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialTab, setInitialTab] = useState("login");
  const { isLoggedIn } = useContext(AuthContext);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const toggleModal = (tab) => {
    setInitialTab(tab);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 m-0 backdrop-blur-sm z-50 rounded-b-sm" style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
        <nav
          className={`p-2 lg:p-4 flex justify-between items-center ${
            isLoggedIn && "grid"
          } `}
        >
          {isLoggedIn && (
            <div className="col-start-1">
              <button onClick={toggleOpen} className="shadow-none">
                {!isOpen ? (
                  <RiMenuFill className="text-mid-green text-3xl shadow-none hover:text-dark-green" />
                ) : (
                  <RiMenu3Fill className="text-mid-green text-3xl shadow-none hover:text-dark-green" />
                )}
              </button>
            </div>
          )}

          <div
            className={`navbar-title flex justify-center ${
              isLoggedIn && "col-start-2"
            }`}
          >
            <Link to="/">
              <img src={logo} alt="Logo" className="h-10" />
            </Link>
          </div>

          {isLoggedIn ? (
            <div className="col-start-3 flex justify-end">
              <Link to="greenflow/account">
                <button className="shadow-none">
                  <IoPerson className="text-mid-green text-3xl hover:text-dark-green" />
                </button>
              </Link>
            </div>
          ) : (
            <div className="col-span-2 flex justify-end gap-1">
              <button
                onClick={() => toggleModal("login")}
                className="bg-mid-green font-semibold text-sm text-white py-1 px-2 rounded-lg shadow-md hover:bg-dark-green"
              >
                Login
              </button>
              <button
                onClick={() => toggleModal("signup")}
                className="bg-white text-mid-green text-sm font-semibold py-1 px-2 rounded-lg shadow-md hover:text-dark-green"
              >
                Cadastre-se
              </button>
            </div>
          )}
        </nav>
        {isOpen && isLoggedIn && (
          <div className=" text-mid-green flex justify-around gap-4 mx-2 p-4 ">
            <Link
              to="greenflow/home"
              className="flex flex-col items-center hover:text-dark-green"
            >
              <RiHomeFill className="text-2xl" />
              Home
            </Link>
            <Link
              to="greenflow/dashboards"
              className="flex flex-col items-center hover:text-dark-green"
            >
              <RiDashboardFill className="text-2xl" />
              Dashboards
            </Link>
            <Link
              to="greenflow/dicas"
              className="flex flex-col items-center hover:text-dark-green"
            >
              <MdTipsAndUpdates className="text-2xl" />
              Dicas
            </Link>
            <Link
              to="greenflow/tracker"
              className="flex flex-col items-center hover:text-dark-green"
            >
              <RiMapPinTimeFill className="text-2xl" />
              Tracker
            </Link>
          </div>
        )}
      </div>
      <SignUp isOpen={isModalOpen} toggleModal={() => setIsModalOpen(false)} initialTab={initialTab} />
    </>
  );
};

export default Navbar;