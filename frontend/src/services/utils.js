export const hasPermission = (permissions, allowedPermissions) => {
	return permissions.some((permission) => {
		return allowedPermissions.includes(permission.name);
	});
};
