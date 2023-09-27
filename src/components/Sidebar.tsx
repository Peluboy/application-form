import "../styles/sidebar.css";
import { Tooltip } from "antd";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineHome } from "react-icons/ai";
import { LuFileText } from "react-icons/lu";
const Sidebar = () => {
  const [activeItem, setActiveItem] = useState<number | null>(0);

  const handleItemClick = (index: number) => {
    setActiveItem(index);
  };

  return (
    <section className="sidebar-container">
      <div className="sidebar-top">
        <div className="sidebar-hamburger">
          <RxHamburgerMenu />
        </div>
        <div
          className={`sidebar-icons ${activeItem === 0 ? "active" : ""}`}
          onClick={() => handleItemClick(0)}
        >
          <Tooltip title="Home" placement="right">
            <AiOutlineHome size="18px" />
          </Tooltip>
        </div>
        <div
          className={`sidebar-icons ${activeItem === 1 ? "active" : ""}`}
          onClick={() => handleItemClick(1)}
        >
          <Tooltip title="Schedule" placement="right">
            <LuFileText size="18px" />
          </Tooltip>
        </div>
      </div>

      <div className="sidebar-bottom">
        <div className="initials">AS</div>
      </div>
    </section>
  );
};

export default Sidebar;
