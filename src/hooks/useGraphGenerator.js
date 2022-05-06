import heliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import { useEffect, useState } from 'react';

export const useGraphGenerator = (schema, dispo, workdays, mode) => {
  const [values, setValues] = useState({ users: [], graph: [] });
  const {
    graphGenerator,
    firestore: { getEmployeesList },
  } = heliosAppSdk;

  useEffect(() => {
    if (mode === 'create') {
      getEmployeesList()
        .then((respond) => {
          const usersList = [];
          if (respond.size) {
            respond.forEach((user) => {
              usersList.push(user.data());
            });
          }

          const { users, graph } = graphGenerator.init(schema, dispo, usersList, workdays);
          setValues({ users, graph });
        })
        .catch((e) => alert(e.code));
    }
  }, []);

  return values;
};
