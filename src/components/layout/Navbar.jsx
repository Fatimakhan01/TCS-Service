import React from "react";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { navigation } from "../../utils/navigation";

const Navbar = ({ toggleSidebar }) => {
  const location = useLocation();

  const currentPage = navigation.find(
    (item) => item.path === location.pathname,
  );

  return (
    <nav className="bg-white border-b px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-2xl text-gray-700 hover:text-blue-600"
        >
          <FaBars />
        </button>

        <h1 className="text-xl font-semibold">
          {currentPage ? currentPage.title : "Dashboard"}
        </h1>
      </div>

      <div className="flex items-center gap-5">
        <button className="relative text-xl hover:text-gray-600 transition">
          <FaBell />

          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-2 hover:underline cursor-pointer">
          <FaUserCircle className="text-3xl text-gray-600 " />

          <span className="hidden md:block ">Fatima</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
