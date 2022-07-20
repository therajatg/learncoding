import { useContext, createContext, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const localstoragetoken = localStorage.getItem("token");
  const [authState, authDispatch] = useReducer(authReducer, {
    user: {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
    },
    token: localstoragetoken ?? null,
    error: null,
  });
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth, AuthProvider };
