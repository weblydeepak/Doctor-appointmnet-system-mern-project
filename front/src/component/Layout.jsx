import React from "react";
import { UserMenu, adminMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";

const Layout = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = null;
    message.success("Logout Successfully");
    window.location.reload();
    localStorage.clear();
    navigate("/login");
  };

  const doctorMenu = [
    { name: "Home", path: "/", icon: "fa-solid fa-house" },
    { name: "Appointments", path: "/doctor-appointments", icon: "fa-solid fa-list" },
    { name: "Profile", path: `/Doctor/profile/${user?._id}`, icon: "fa-solid fa-user" },
  ];

  const SidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : UserMenu;

  return (
    <div className="main p-5 h-[91vh] bg-gray-100 flex">
      {/* Sidebar */}
      <div className="sidebar h-[90vh] w-72 rounded-xl bg-[#432004] shadow-xl text-white p-5">
        <div className="logo text-center text-4xl font-extrabold mb-6">Doc APP</div>
        <hr className="border-gray-500 mb-5" />

        {/* Menu Items */}
        <div className="menu space-y-2">
          {SidebarMenu.map((menu, index) => {
            const isActive = location.pathname === menu.path;
            return (
              <Link
                key={index}
                to={menu.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive ? "bg-white text-[#432004] shadow-md" : "hover:bg-white hover:text-[#432004]"
                }`}
              >
                <i className={menu.icon}></i>
                <span className="text-lg">{menu.name}</span>
              </Link>
            );
          })}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 mt-4 hover:bg-white hover:text-[#432004]"
          >
            <i className="fa-solid fa-sign-out-alt"></i>
            <span className="text-lg  ">Logout</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="content flex-1 h-full pl-5">
        {/* Header */}
        <div className="header h-[10vh] mb-5 px-6 shadow-lg bg-white flex items-center justify-end rounded-lg">
          <div className="flex items-center gap-6">
            <Badge
              count={user?.notification?.length}
              onClick={() => navigate("/notification")}
              style={{ cursor: "pointer", backgroundColor: "#ff4d4f", color: "white" }}
            >
              <i className="fa-solid fa-bell text-xl text-gray-700 hover:text-gray-900 transition"></i>
            </Badge>
            <Link className="text-xl font-semibold uppercase text-gray-800 hover:text-gray-600 transition" to="/profile">
              {user.name}
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="body h-[76vh] overflow-y-auto shadow-md bg-white p-6 rounded-lg">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
