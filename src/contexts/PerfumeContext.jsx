import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../lib/firebase";

const PerfumeContext = createContext();

export const PerfumeProvider = ({ children }) => {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "perfumes"), (snapshot) => {
      const fetchedPerfumes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPerfumes(fetchedPerfumes);
      setLoading(false);
    });

    return () => unsubscribe;
  }, []);
  return (
    <PerfumeContext.Provider value={{ perfumes, loading }}>
      {children}
    </PerfumeContext.Provider>
  );
};

export const usePerfumes = () => useContext(PerfumeContext);
