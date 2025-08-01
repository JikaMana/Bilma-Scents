import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { toast } from "sonner";

const PerfumeContext = createContext();

export const PerfumeProvider = ({ children }) => {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const TOTAL_PERFUME_PER_PAGE = 20;

  useEffect(() => {
    try {
      setLoading(true);
      const unsubscribe = onSnapshot(collection(db, "perfumes"), (snapshot) => {
        const fetchedPerfumes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPerfumes(fetchedPerfumes);
        setLoading(false);
      });
      return () => unsubscribe;
    } catch (error) {
      toast.error("Failed to fetch data");
      setLoading(false);
      return error;
    }
  }, []);

  // const handleDeleteProduct = (id) => {
  //   setPerfumes(perfumes.filter((p) => p.id !== id));
  // };

  const handleDeleteProduct = async (id) => {
    try {
      // 1. Create a reference to the document in Firestore
      const perfumeDocRef = doc(db, "perfumes", id);
      // 2. Delete the document from Firestore
      await deleteDoc(perfumeDocRef);
      // 3. If the database deletion is successful, update the local state
      setPerfumes(perfumes.filter((p) => p.id !== id));
      toast.error("Perfume successfully removed");
    } catch (error) {
      toast.error("Error removing perfume");
    }
  };

  return (
    <PerfumeContext.Provider
      value={{
        perfumes,
        setPerfumes,
        handleDeleteProduct,
        loading,
        TOTAL_PERFUME_PER_PAGE,
      }}
    >
      {children}
    </PerfumeContext.Provider>
  );
};

export const usePerfumes = () => useContext(PerfumeContext);
