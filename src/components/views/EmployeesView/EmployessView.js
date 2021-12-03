import React from 'react';
import { collection, getDocs, addDoc, setDoc, doc } from 'firebase/firestore';
import { db } from 'api/firebase/firebase.config';
import { schema } from 'data/schema1';

const EmployeesView = () => {
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, 'graphschema'));
    console.log(querySnapshot);
    querySnapshot.forEach((docItem) => {
      console.log(docItem.id);
      console.log(docItem.data());
    });
  };

  const sendData = async () => {
    try {
      await setDoc(doc(db, 'graphschema', 'szablon nr1'), schema);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <>
      <h2>Siema</h2>
      <button onClick={getData} type="button">
        Wyslij request2
      </button>
      <button onClick={sendData} type="button">
        Wyslij dane
      </button>
    </>
  );
};

export default EmployeesView;
