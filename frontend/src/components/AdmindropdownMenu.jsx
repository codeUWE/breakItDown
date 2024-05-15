import React, { useState } from "react";
import dropdown from "../assets/dropdown.png";
import { NavLink } from "react-router-dom";

const AdmindropdownMenu = () => {

  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-3 py-2 border border-transparent text-base font-medium rounded-md text-gray-700bg-transparent hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
      >
        <img src={dropdown} alt="" width={27} height={27} />
      </button>
      {/* Dropdown menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div className="py-1" role="none">
          {/* Dropdown items */}
          <NavLink
            to="/admin/dashboard/projects"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            font-outfit
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            Manage Projects
          </NavLink>
          <NavLink
            to="/admin/dashboard/roles"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            Manage Roles
          </NavLink>
          <NavLink
            to="/admin/dashboard/users"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            Manage Users
          </NavLink>

          {/* Add more dropdown items as needed */}
        </div>
      </div>
    </div>
  );
};

export default AdmindropdownMenu;
