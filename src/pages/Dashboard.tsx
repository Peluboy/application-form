import CoverImage from "../components/CoverImage";
import PersonalInformation from "../components/PersonalInformation";
import Profile from "../components/Profile";
import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <CoverImage />
      <PersonalInformation />
      <Profile />
    </div>
  );
};

export default Dashboard;
