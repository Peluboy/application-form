import "../styles/layout.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Routers from "../routers/Routers";
import Scrollbars from "react-custom-scrollbars-2";

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
        <Scrollbars style={{ width: "100%", height: "100%" }}>
          <Routers />
        </Scrollbars>
      </div>
    </div>
  );
};

export default Layout;
