const firestoreConstants = {
  paths: {
    users: 'users',
    dispositionsCycles: 'dispositionsSortedByCycles',
    dispositionsEmployees: 'dispositionsSortedEmployees',
    stateApp: {
      pathName: 'statesApp',
      segments: {
        dispoSendInfo: 'dispoSendInfo',
        cycleState: 'cycleState',
        settings: 'settings',
      },
    },
  },
  roles: {
    admin: 'admin',
    user: 'user',
  },
};

export default firestoreConstants;
