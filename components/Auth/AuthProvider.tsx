import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { setAccessToken } from "../../utils/token";

interface IProps {}

/**
 * @author
 * @function @AuthProvider
 **/

interface InitialAuthState {
  token: string;
  userId: number | null;
}

const AuthContext = createContext({});

const AuthProvider: FC<IProps> = (props) => {
  const initialAuthState: InitialAuthState = {
    token: "",
    userId: null,
  };
  const [authState, setAuthState] = useState(initialAuthState);

  useEffect(() => {
    if (localStorage.getItem("userId") !== authState.userId) {
      setAuthState({
        ...authState,
        userId: 1,
      });
    }
  }, [authState]);

  const signIn = (userId: number, token: string) => {
    setAuthState({
      ...authState,
      userId,
      token,
    });
    if (typeof window !== "undefined") {
      setAccessToken(token);
    }
  };

  const setAuthToken = (token: string) => {
    setAuthState({
      ...authState,
      token,
    });
  };

  const signOut = () => {
    setAuthState(initialAuthState);
    if (typeof window !== "undefined") {
      localStorage.removeItem("userId");
    }
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthToken, signIn, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); // to consume context data

export default AuthProvider;
