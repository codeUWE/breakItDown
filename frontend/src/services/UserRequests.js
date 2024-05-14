import axiosClient from "../axiosClient";

// Get Projects
export const getProject = async () => {
  const { data } = await axiosClient.get("/projects");
  return data;
};

export const getProjectByOwner = async (id) => {
  const { data } = await axiosClient.get(`/projects/users/${id}`);
  return data;
};

export const createProject = async (payload) => {
  const { data } = await axiosClient.post(`/projects`, payload);
  return data;
};

//Get roles
export const getRoles = async () => {
  const { data } = await axiosClient.get("/roles");
  return data;
};
//Get Permissions
export const getPermissions = async () => {
  const { data } = await axiosClient.get("/permissions");
  return data;
};
//Get users
export const getUsers = async () => {
  const { data } = await axiosClient.get("/users");
  return data;
};
// Create User
export const createUser = async (data) => {
  const { userData } = axiosClient.post("/users", data);
  return userData;
};

//Delete User
export const deleteUser = async (data) => {
  const { userData } = await axiosClient.delete("/users", data);
  return userData;
};

export const updateUser = async (id, updates) => {
  const { data } = await axiosClient.put(`/users/${id}`, updates);
  return data;
};

//Updating Project Role details
export const updateProjectRole = async (id, updates) => {
  const { data } = await axiosClient.put(`/projects/${id}`, updates);
  return data;
};

//Deleting Project Role details
export const deleteProjectRole = async (id) => {
  const { data } = await axiosClient.delete(`/projects/${id}`);
  return data;
};
