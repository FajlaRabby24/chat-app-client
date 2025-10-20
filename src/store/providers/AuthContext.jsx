import { AuthContext } from "../contexts";

export const AuthProvider = ({ children }) => {
  const authValue = {};

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
