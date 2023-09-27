// CustomDropdown.tsx
import React, { useState } from "react";
import "../styles/customdashboard.css";

interface CustomDropdownProps {
  options: string[]; // Define the options as an array of strings
  onSelect: (selectedOption: string) => void; // Define the onSelect callback function
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  onSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState(options[0]); // Initialize with the first option

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    onSelect(option); // Call the provided onSelect callback
  };

  return (
    <div className="select" tabIndex={1}>
      {options.map((option) => (
        <React.Fragment key={option}>
          <input
            type="radio"
            className="selectopt"
            name="dropdownOptions"
            id={option}
            checked={selectedOption === option}
            onChange={() => handleOptionChange(option)}
          />
          <label htmlFor={option} className="option">
            {option}
          </label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default CustomDropdown;
