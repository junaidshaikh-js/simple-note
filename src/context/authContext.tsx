import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { childrenType, authFunction } from "./context.type";
import { auth } from "../config/firebase-config";

type AuthContextProviderProps = {
  children: childrenType;
};

type AuthContextType = {
  uid: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: authFunction;
  createUser: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext({} as AuthContextType);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [uid, setUid] = useState<string>("");
  const [loading, setIsloading] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId") || "";

    setUid(userId);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        localStorage.setItem("userId", JSON.stringify(user.uid));
      } else {
        setUid("");
        localStorage.removeItem("userId");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [uid]);

  const login = async (email: string, password: string) => {
    try {
      setIsloading(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      localStorage.setItem("userId", JSON.stringify(user.uid));

      setUid(user.uid);
      toast.success("Logged in successfully.");
      setIsloading(false);
      navigate("/");
    } catch (error) {
      setIsloading(false);
      console.log(error);
      toast.error("Invalid email or password");
    }
  };

  const logout = async () => {
    setIsloading(true);
    await signOut(auth);
    setUid("");
    console.log("running after 69");
    // localStorage.removeItem("userId");
    toast.success("logged out successfully");
    setIsloading(false);
    navigate("/");
  };

  const createUser = async (email: string, password: string) => {
    try {
      setIsloading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      localStorage.setItem("userId", JSON.stringify(user.uid));

      setUid(user.uid);
      toast.success("Sign up successful.");
      setIsloading(false);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          toast.error("Email is already registered.");
        }
      }
      setIsloading(false);
    }
  };

  const value = {
    uid,
    loading,
    login,
    logout,
    createUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthContextProvider, useAuth };
