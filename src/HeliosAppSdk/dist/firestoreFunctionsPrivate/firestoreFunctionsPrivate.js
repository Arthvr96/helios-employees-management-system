import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
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

export const __handleUpdateDoc__ = (collectionName, documentName, data) => {
  return updateDoc(doc(db, collectionName, documentName), data);
};
export const __handleDeleteDoc__ = (collectionName, documentName) => {
  return deleteDoc(doc(db, collectionName, documentName));
};

export const __handleOnSnapshot__ = (collectionName, documentName, callback) => {
  return onSnapshot(doc(db, collectionName, documentName), callback);
};

export const __firestoreFunctionsPrivate__ = {
  __handleGetDoc__,
  __handleGetDocs__,
  __handleSetDoc__,
  __handleUpdateDoc__,
  __handleDeleteDoc__,
  __handleOnSnapshot__,
};
