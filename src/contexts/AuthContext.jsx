import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { toast } from "sonner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUp = async (email, password, displayName) => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCred.user, { displayName });
      toast.success("Account Created successfully");
      setUser(userCred.user);
      return userCred;
    } catch (error) {
      throw error;
    }
  };

  const logIn = async (email, password) => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCred.user);
      toast.success("Access granted");
      return userCred;
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
    toast.success("User logged ou");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signUp, logIn, loginWithGoogle, logOut }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
