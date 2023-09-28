import React, { useState } from "react";
import "../styles/header.css";

const Header = () => {
  const [activeItem, setActiveItem] = useState("Application Form");

  const navItems = [
    "Program Details",
    "Application Form",
    "Workflow",
    "Preview",
  ];

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <header className="header-container">
      <nav>
        <ul className="nav-list">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`nav-item${item === activeItem ? " active" : ""}`}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
