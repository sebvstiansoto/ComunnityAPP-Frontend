import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faGithub,
  faLinkedin,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom'; 

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login'); 
};

const username = localStorage.getItem('username');
const navigate = useNavigate(); 

const NavBar = () => {
  const isLoggedIn = Boolean(localStorage.getItem("userEmail"));

  const renderIconLink = (href, icon) => (
    <a href={href} className="hover:text-black">
      <FontAwesomeIcon icon={icon} />
    </a>
  );

  return (
    <nav className="flex justify-between items-center text-white h-16 bg-gray-600">
      <div className="flex items-center space-x-4 ml-8">
        {renderIconLink("https://twitter.com", faXTwitter)}
        {renderIconLink("https://github.com", faGithub)}
        {renderIconLink("https://linkedin.com", faLinkedin)}
      </div>
      <div className="flex flex-col items-center">
        <a href="/" className="flex items-center flex-col">
          <img
            src="../assets/light-icon.png"
            alt="Project Icon"
            className="w-auto rounded-full object-cover h-12 mr-2 px-2"
          />
        </a>
      </div>
      <div className="flex items-center space-x-2 mr-8">
        <a
          href={isLoggedIn ? "/account" : "/login"}
          className="hover:text-black"
        >
          <FontAwesomeIcon icon={faUser} />
          <span>{isLoggedIn ? "ACCOUNT" : "LOGIN"}</span>
        </a>
        <a href="/cart" className="hover:text-black">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="ml-1">{totalItems}</span>
          </div>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;