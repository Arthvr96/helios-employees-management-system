import React, { useEffect } from 'react';
import ViewTemplate from 'components/templates/ViewTemplate/ViewTemplate';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import heliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import { init } from 'mocks/graphgenerator/graphGenerator';
import { setCookie } from 'utliltes/cookies';

const GraphsArchive = () => {
  const { __handleGetDocs__ } = heliosAppSdk.__firestoreFunctionsPrivate__;
  const { users } = heliosAppSdk.firestoreConstants.paths;
  useEffect(() => {
    __handleGetDocs__(users, 'role', '==', 'user').then((r) => {
      const arr = [];
      r.forEach((el) => {
        arr.push(el.data());
      });
      console.log(arr);
      console.log(JSON.stringify(arr));
    });
  }, []);

  return (
    <ViewTemplate>
      <CardTemplate>Grafiki</CardTemplate>
    </ViewTemplate>
  );
};

export default GraphsArchive;
