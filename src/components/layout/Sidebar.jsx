import React from "react";
import { NavLink } from "react-router-dom";
import { navigation } from "../../utils/navigation";

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
  return (
    <aside
  className={`fixed top-0 left-0 h-screen w-64 bg-slate-900 text-white z-40
  transform transition-transform duration-300
  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
  lg:translate-x-0`}
>
      {" "}
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-2xl font-bold text-center">TCS Cargo</h2>
      </div>
      <nav className="mt-6">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 transition ${
                  isActive ? "bg-blue-600" : "hover:bg-slate-800"
                }`
              }
            >
              <Icon />

              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
