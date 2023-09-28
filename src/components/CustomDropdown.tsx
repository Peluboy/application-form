import React, { useState, useRef, useEffect } from "react";
import "../styles/customdashboard.css";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

interface CustomDropdownProps {
  options: string[];
  onSelect: (selectedOption: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`custom-dropdown ${isOpen ? "active" : ""}`}>
      <div className="selected-option" onClick={toggleDropdown}>
        {selectedOption} {isOpen ? <FaAngleUp /> : <FaAngleDown />}
      </div>
      {isOpen && (
        <div className="dropdown-options" ref={dropdownRef}>
          {options.map((option) => (
            <div
              key={option}
              className="option"
              onClick={() => handleOptionChange(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
