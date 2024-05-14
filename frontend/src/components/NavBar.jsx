import React from "react";
import { Avatar } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function NavBar() {
  const { isLoading, user, logout } = useContext(AuthContext);
  return (
    <nav className="w-[1024px] h-[105px] rounded-[20px] border-[2px] border-black flex items-center justify-self-auto font-Inter font-[600] text-[32px] ">
      {/* Avatar */}
      <span className="flex items-center">
        <Avatar
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="avatar"
          size="xl"
          withBorder={true}
          // className="w-[29px] h-[29px] absolute top- left-0 z-50"
          className="m-3"
        />
      </span>
      {/* Navigation Links		 */}
      {!isLoading && (
        <div className="flex justify-end content- m-6  pl-3.5">
          <ul className="flex space-x-4 ">
            {/* need to decide 1st Page of App */}
            {/* <NavLink to="/">Login</NavLink> */}
            {user.role.name === "Admin" ? (
              <NavLink to="/admin/dashboard/projects">Admin-Dashboard</NavLink>
            ) : (
              ""
            )}
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/tasks">Tasks</NavLink>
            <NavLink to="/team">Team</NavLink>
            <NavLink to="/notes">Notes</NavLink>
          </ul>
        </div>
      )}

      {/* Logout Button */}
      <button className="flex justify-end pl-3" onClick={logout}>
        Logout
      </button>
    </nav>
  );
}

export default NavBar;
