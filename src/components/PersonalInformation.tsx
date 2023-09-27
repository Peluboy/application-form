import { Card } from "antd";
import "../styles/dashboard.css";
import { Switch, Checkbox } from "antd";
import { useState } from "react";
import { RiAddFill } from "react-icons/ri";
import { inputFields } from "../assets/data/data";

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
          <div className="add-questions">
            <RiAddFill size="20px" />
            <span>Add a question</span>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default PersonalInformation;
