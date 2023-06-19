import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";
import {
  AiOutlineCar,
  AiOutlineUserAdd,
  AiOutlineEnter,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineMenu,
} from "react-icons/ai";
import jwtDecode from "jwt-decode";
import { API_URL, sendRequest } from "../../utils/Api";

const sidebarNavItems = [
  {
    display: "Dashboard",
    icon: <AiOutlineHome />,
    to: "/dashboard",
    section: "dashboard",
  },
  {
    display: "Logout",
    icon: <AiOutlineLogout />,
    to: "/owners",
    section: "owners",
    onClick: async () => {
      window.location.href = "/";
      localStorage.removeItem("token");
    },
  },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sidebarRef = useRef();

  const location = useLocation();
  const [profile, setProfile] = useState();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const token = localStorage.getItem("token");
      const { user } = jwtDecode(token);
      console.log("user...", user);
      setProfile(user);
    }
    loadData();
  }, []);

  // change active index
  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    setSidebarOpen(false);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="sidebar__toggle" onClick={handleSidebarToggle}>
        <AiOutlineMenu />
      </div>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar__logo text-center">
          Equipment Distribution System
        </div>
        <div className="sidebar__sublogo flex justify-center">
          Welcome{" "}
          <span className="px-2 ml-1 py-1 text-center text-white bg-neutral-800">
            {profile?.names}
          </span>
        </div>
        <div ref={sidebarRef} className="sidebar__menu">
          {sidebarNavItems.map((item, index) => (
            <Link to={item.to} key={index}>
              <div
                className={`sidebar__menu__item ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => {
                  if (item?.onClick) {
                    item.onClick();
                  }
                }}
              >
                <div className="sidebar__menu__item__icon">{item.icon}</div>
                <div className="sidebar__menu__item__text">{item.display}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
