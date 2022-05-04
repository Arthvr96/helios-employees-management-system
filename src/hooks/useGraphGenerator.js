import heliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import { useEffect, useState } from 'react';

export const useGraphGenerator = (schema, dispo) => {
  const [values, setValues] = useState({ users: [], graph: [] });
  const { graphGenerator, firestore } = heliosAppSdk;

  useEffect(() => {
    firestore.getEmployeesList().then((respond) => {
      const usersList = [];
      if (respond.size) {
        respond.forEach((user) => {
          usersList.push(user.data());
        });
      }

      const { users, graph } = graphGenerator.init(schema, dispo, usersList);
      console.log(users);
      console.log(graph);
      // setValues({ users, graph });
    });
  }, []);

  return values;
};
