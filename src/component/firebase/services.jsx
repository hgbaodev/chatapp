import { db } from "../firebase/config";
import { addDoc, serverTimestamp } from "firebase/firestore";

export const addDocument = (collection, data) => {
  const query = collection(db, "users");
  addDoc(query, {
    ...data,
    createAt: serverTimestamp(),
  });
};
