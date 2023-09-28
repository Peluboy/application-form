import React, { useState } from "react";
import { Card, Switch, Checkbox } from "antd";
import { profileFields } from "../assets/data/data";
import QuestionDisplay from "./QuestionDisplay";
import "../styles/dashboard.css";
import { AnyQuestion } from "./QuestionForm";

interface SwitchState {
  [key: string]: boolean;
}

interface ProfileProps {
  onProfileDataChange: (profileData: any) => void;
}

const Profile: React.FC<ProfileProps> = ({ onProfileDataChange }) => {
  const [switchStates, setSwitchStates] = useState<SwitchState>({});
  const [profileQuestions, setProfileQuestions] = useState<AnyQuestion[]>([]);

  const handleSwitchToggle = (name: string) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [name]: !prevStates[name],
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onProfileDataChange({ [name]: value });
  };

  const handleAddProfileQuestion = (question: AnyQuestion) => {
    const updatedQuestions = [...profileQuestions, question];
    setProfileQuestions(updatedQuestions);
  };

  return (
    <div>
      <Card
        title="Profile Information"
        bordered={false}
        style={{ width: 500, fontSize: "14px" }}
      >
        <form action="">
          {profileFields.map((field) => (
            <div className="form__group field" key={field.name}>
              <input
                className="form__field"
                placeholder={field.label}
                name={field.name}
                id={field.name}
                onChange={handleInputChange}
                required
              />
              <label htmlFor={field.name} className="form__label">
                {field.label}
              </label>
              <div className="checkbox-switch">
                {field.hasCheckbox && (
                  <div className="checkbox">
                    <Checkbox />
                    <span>Mandatory</span>
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
          <div className="additional-questions">
            <QuestionDisplay
              initialQuestions={profileQuestions}
              onSaveQuestion={handleAddProfileQuestion}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
