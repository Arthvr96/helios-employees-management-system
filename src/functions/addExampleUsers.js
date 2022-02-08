import { exampleUsers } from 'devData/exampleUsers';
import { managementUsers } from 'functions/managementUsers';

export const addExampleUsers = async () => {
  const { createUser } = managementUsers();
  exampleUsers.forEach((user, i) => {
    const { firstName, lastName, email, alias, workplaces } = user;
    const values = {
      firstName,
      lastName,
      email,
      alias,
    };
    createUser(values, workplaces, false).catch((error) => {
      console.log(error);
    });
  });
};
