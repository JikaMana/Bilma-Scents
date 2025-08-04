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
import { auth, db } from "../lib/firebase";
import { toast } from "sonner";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const getInitials = (name) => {
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0][0];
    return `${names[0][0]}${names[1][0]}`.toUpperCase();
  };

  const createUserInDB = async (currentUser) => {
    const userRef = doc(db, "customers", currentUser.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        name: currentUser.displayName,
        email: currentUser.email,
        customerId: currentUser.uid,
        role: "user",
        photoURL:
          currentUser.photoURL ||
          `https://ui-avatars.com/api/?name=${getInitials(
            currentUser.displayName || "A"
          )}`,
        numberOfOrders: 0,
        lastActive: serverTimestamp(),
      });
    }
  };

  const updateLastActive = async (currentUser) => {
    const userRef = doc(db, "customers", currentUser.uid);
    await setDoc(userRef, { lastActive: serverTimestamp() }, { merge: true });
  };

  const signUp = async (email, password, displayName) => {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCred.user, { displayName });
    toast.success("Account Created successfully");
    setUser(userCred.user);

    createUserInDB(userCred.user);

    return userCred;
  };

  const logIn = async (email, password) => {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    setUser(userCred.user);
    toast.success("Access granted");
    return userCred;
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    if (user) {
      toast.success("User logged out");
      return signOut(auth);
    }
    toast.error("No user Logged in");
    return;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currUser) => {
      setUser(currUser);
      setLoading(false);
      if (currUser) {
        setUserId(currUser.uid);

        updateLastActive(currUser);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe;
  }, []);

  useEffect(() => {
    localStorage.setItem("UserId", userId);
  }, [user, userId]);

  // console.log( userId);

  return (
    <AuthContext.Provider
      value={{ user, userId, signUp, logIn, loginWithGoogle, logOut }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
