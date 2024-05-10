import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

function Authorize({ role }) {
  const { user } = useContext(AuthContext);
  console.log(user.role.name);

  return <>{role === user.role.name ? <Outlet /> : <Navigate to="/" />}</>;
}

export default Authorize;
