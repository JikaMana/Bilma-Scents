import { collection, onSnapshot } from "firebase/firestore";
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
    }
  }, []);

  const handleDeleteProduct = (id) => {
    setPerfumes(perfumes.filter((p) => p.id !== id));
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
