import CoverImage from "../components/CoverImage";
import PersonalInformation from "../components/PersonalInformation";
import Profile from "../components/Profile";
import Questions from "../components/Questions";
import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <CoverImage />
      <PersonalInformation />
      <Profile />
      <Questions />
    </div>
  );
};

export default Dashboard;
