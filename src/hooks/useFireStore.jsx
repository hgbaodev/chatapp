import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../component/firebase/config";

const useFireStore = (colRef, condition) => {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    // Firestore Queries
    const colRefQuery = collection(db, colRef);
    const q = query(
      colRefQuery,
      where(
        condition.fieldName,
        condition.operator,
        condition.compareValue || ""
      ),
      orderBy("createAt")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let datas = [];
      snapshot.forEach((doc) => {
        datas.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setDocuments(datas);
    });

    return () => {
      // Unsubscribe from the snapshot listener when the component unmounts
      unsubscribe();
    };
  }, [colRef, condition]);

  return documents;
};

export default useFireStore;
