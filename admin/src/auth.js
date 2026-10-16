export const getCmsUser = () => {
  try {
    return JSON.parse(sessionStorage.getItem("cms-user") || "null");
  } catch {
    return null;
  }
};
export const canAccess = (scope) =>
  Boolean(getCmsUser()?.scopes?.includes(scope));
export const clearCmsSession = () => {
  sessionStorage.removeItem("cms-token");
  sessionStorage.removeItem("cms-user");
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("username");
  localStorage.removeItem("rememberMe");
};
