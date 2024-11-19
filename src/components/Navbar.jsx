import { RiMenuFill } from "react-icons/ri";
import { RiMenu3Fill } from "react-icons/ri";
import { RiHomeFill } from "react-icons/ri";
import { RiDashboardFill } from "react-icons/ri";
import { MdTipsAndUpdates } from "react-icons/md";
import { RiMapPinTimeFill } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_green_flow.svg";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = () => {
    setIsLogged(!isLogged);
};

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };



  return (
    <>
      <div className="fixed top-0 left-0 right-0 m-0 backdrop-blur-sm z-50">
        <nav
          className={`p-2 flex justify-between items-center ${
            isLogged && "grid"
          } `}
        >
          {isLogged && (
            <button onClick={toggleOpen} className="col-start-1">
              {!isOpen ? (
                <RiMenuFill className="text-mid-green text-3xl" />
              ) : (
                <RiMenu3Fill className="text-mid-green text-3xl" />
              )}
            </button>
          )}

          <div
            className={`navbar-title flex justify-center ${
              isLogged && "col-start-2"
            }`}
          >
            <img src={logo} alt="GreenFlow" className="w-36" />
          </div>
          {isLogged ? (
            <button
              className="navbar-icon col-start-3 flex justify-end"
              onClick={handleLogin}
            >
              <IoPerson className="text-mid-green text-3xl" />
            </button>
          ) : (
            <div className="col-span-2 flex justify-end gap-1">
              <button onClick={handleLogin} className="bg-mid-green font-semibold text-sm text-white py-1 px-2 rounded-lg shadow-md hover:bg-dark-green">
                Login
              </button>
              <button className="bg-white text-mid-green text-sm font-semibold py-1 px-2 rounded-lg shadow-md hover:text-dark-green">
                Cadastre-se
              </button>
            </div>
          )}
        </nav>
        {isOpen && (
          <div className=" text-mid-green flex justify-between gap-4 mx-2 p-4 ">
            <Link
              to="/greenflow"
              className="flex flex-col items-center hover:text-dark-green"
            >
              <RiHomeFill className="text-2xl" />
              Home
            </Link>
            <Link
              to="/greenflow"
              className="flex flex-col items-center hover:text-dark-green"
            >
              <RiDashboardFill className="text-2xl" />
              Dashboards
            </Link>
            <Link
              to="/greenflow"
              className="flex flex-col items-center hover:text-dark-green"
            >
              <MdTipsAndUpdates className="text-2xl" />
              Dicas
            </Link>
            <Link
              to="/sobre"
              className="flex flex-col items-center hover:text-dark-green"
            >
              <RiMapPinTimeFill className="text-2xl" />
              Tracker
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
