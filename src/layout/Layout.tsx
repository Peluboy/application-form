import "../styles/layout.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Routers from "../routers/Routers";

const Layout = () => {
  return (
    <div className="layout-container">
      <div className="header">
        <Header />
      </div>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <Routers />
      </div>
    </div>
  );
};

export default Layout;
