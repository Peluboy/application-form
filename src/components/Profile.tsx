import React, { useState } from "react";
import { Card, Switch, Checkbox } from "antd";
import { RiAddFill } from "react-icons/ri";
import { profileFields } from "../assets/data/data";

interface SwitchState {
  [key: string]: boolean;
}

const Profile = () => {
  const [switchStates, setSwitchStates] = useState<SwitchState>({});

  const handleSwitchToggle = (name: string) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [name]: !prevStates[name],
    }));
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
          <div className="add-questions">
            <RiAddFill size="20px" />
            <span>Add a question</span>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
