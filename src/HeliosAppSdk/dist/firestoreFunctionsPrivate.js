import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from 'api/firebase/firebase.config';

export const __handleGetDoc__ = (collectionName, documentName) => {
  return getDoc(doc(db, collectionName, documentName));
};

export const __handleGetDocs__ = async (collectionName, fieldPath, opStr, value) => {
  let q;

  if (fieldPath !== undefined && opStr !== undefined && value !== undefined) {
    q = query(collection(db, collectionName), where(fieldPath, opStr, value));
  } else {
    q = query(collection(db, collectionName));
  }

  return getDocs(q);
};

export const __handleSetDoc__ = (collectionName, documentName, data) => {
  return setDoc(doc(db, collectionName, documentName), data);
};
