import React, { useState } from "react";

const Menu = ({ fn, id, labelText, fetchCallDetail }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="call-menu">
      <div className="dots-container" onClick={toggleMenu}>
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
      <div className={`context-menu ${isMenuOpen ? "visible" : ""}`}>
        <ul>
          <li
            onClick={() => {
              fetchCallDetail(id);
              toggleMenu();
            }}
          >
            View details
          </li>
          <li
            onClick={() => {
              fn(id);
              toggleMenu();
            }}
          >
            {labelText}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
