import React from 'react';
import { SiteClient } from 'datocms-client';

const client = new SiteClient('403648296660e50ff37f916add4e17');

const EmployeesView = () => {
  async function createRecord() {
    const record = await client.items.create({
      itemType: '1430047', // model ID
      name: 'Maciej',
      fullname: 'Kujawinski',
    });

    console.log(record);
  }
  createRecord();

  return (
    <>
      <h2>Siema</h2>
      <h2>Siema</h2>
      <button onClick={createRecord} type="button">
        Wyslij request
      </button>
    </>
  );
};

export default EmployeesView;
