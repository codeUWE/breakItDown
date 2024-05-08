import axiosClient from "../axiosClient";

//Get all roles
export const getRoles = async () => {
  const { data } = await axiosClient.get("/roles");
  return data;
};
//
