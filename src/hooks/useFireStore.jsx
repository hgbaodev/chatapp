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
    //Firestore Queries
    const colRefQuery = collection(db, "rooms");
    const q = query(
      colRefQuery,
      where(condition.fieldName, condition.operator, condition.compareValue),
      orderBy("createdAt")
    );
    onSnapshot(q, (snapshot) => {
      let rooms = [];
      snapshot.docs.forEach((doc) => {
        rooms.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setDocuments(rooms);
    });
  }, [colRef, condition]);
  return documents;
};

export default useFireStore;
