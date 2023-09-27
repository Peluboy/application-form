import React, { useState } from "react";
import { Button, Card } from "antd";
import "../styles/dashboard.css";
import { Switch, Checkbox } from "antd";
import { RiAddFill } from "react-icons/ri";
import { inputFields } from "../assets/data/data";
import QuestionForm from "./QuestionForm"; // Import the QuestionForm component

interface FormData {
  firstName: string;
  lastName: string;
  emailId: string;
  phoneNumber: string;
  nationality: string;
  currentResidence: string;
  idNumber: string;
  dateOfBirth: string;
  gender: string;
  [key: string]: string;
}

interface SwitchState {
  [key: string]: boolean;
}

const PersonalInformation = () => {
  const initialFormData: FormData = {
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNumber: "",
    nationality: "",
    currentResidence: "",
    idNumber: "",
    dateOfBirth: "",
    gender: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [switchStates, setSwitchStates] = useState<SwitchState>({});
  const [isQuestionFormVisible, setIsQuestionFormVisible] = useState(false); // State to control the visibility of the QuestionForm

  const handleSwitchToggle = (name: string) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [name]: !prevStates[name],
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddQuestionClick = () => {
    setIsQuestionFormVisible(true); // Show the QuestionForm when the button is clicked
  };

  return (
    <div>
      <Card
        title="Personal Information"
        bordered={false}
        style={{ width: 500, fontSize: "14px" }}
      >
        <form action="">
          {inputFields.map((field) => (
            <div className="form__group field" key={field.name}>
              <input
                type={field.type || "text"}
                className="form__field"
                placeholder={field.label}
                name={field.name}
                id={field.name}
                required
                value={formData[field.name]}
                onChange={handleInputChange}
              />
              <label htmlFor={field.name} className="form__label">
                {field.label}
              </label>
              <div className="checkbox-switch">
                {field.hasCheckbox && (
                  <div className="checkbox">
                    <Checkbox />
                    <span>Internal</span>
                  </div>
                )}
                {field.hasSwitch && (
                  <div className="switch">
                    <Switch
                      size="small"
                      onChange={() => handleSwitchToggle(field.name)}
                      checked={switchStates[field.name] || false}
                    />
                    <span>
                      {switchStates[field.name] ? field.switchLabel : "Show"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isQuestionFormVisible && (
            <div className="question-form-pt">
              <QuestionForm
                onSaveQuestion={(question) => {
                  // Handle the saved question data here
                  console.log(question);
                  setIsQuestionFormVisible(false); // Hide the QuestionForm after saving
                }}
              />
            </div>
          )}

          <Button className="add-questions" onClick={handleAddQuestionClick}>
            <RiAddFill size="20px" />
            <span>Add a question</span>
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default PersonalInformation;
