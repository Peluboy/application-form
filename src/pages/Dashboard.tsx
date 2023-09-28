import { useState } from "react";
import CoverImage from "../components/CoverImage";
import PersonalInformation from "../components/PersonalInformation";
import Profile from "../components/Profile";
import Questions from "../components/Questions";
import "../styles/dashboard.css";
import axios from "axios";
import { Button } from "antd";

const Dashboard = () => {
  const [formsFilled, setFormsFilled] = useState(true);

  const [formData, setFormData] = useState({
    coverImage: null as File | null,
    profileData: {},
    personalInformationData: null,
    questionsData: [],
  });

  const handleSaveClick = async (newData: object) => {
    setFormData({ ...formData, ...newData });
    const apiUrl =
      "http://127.0.0.1:3100/api/version/programs/programId/application-form";

    const requestData = {
      data: {
        id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        type: "applicationForm",
        attributes: {
          coverImage: formData.coverImage,
          profileData: formData.profileData,
          personalInformationData: formData.personalInformationData,
          questionsData: formData.questionsData,
        },
      },
    };

    try {
      const response = await axios.put(apiUrl, requestData);
      console.log("Data saved successfully:", response.data);
      setFormsFilled(true);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <CoverImage
        onCoverImageChange={(coverImage: File | null) =>
          setFormData({ ...formData, coverImage })
        }
      />
      <PersonalInformation
        onFormDataChange={(personalInfoData) =>
          handleSaveClick({ personalInformationData: personalInfoData })
        }
      />
      <Profile
        onProfileDataChange={(profileData) => handleSaveClick({ profileData })}
      />
      <Questions
        onQuestionsDataChange={(questionsData) =>
          handleSaveClick({ questionsData })
        }
      />
      <div
        className="save-information-button"
        style={{ paddingBottom: "1rem" }}
      >
        <Button
          type="primary"
          size="large"
          className="save-button"
          onClick={handleSaveClick}
          disabled={!formsFilled}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
