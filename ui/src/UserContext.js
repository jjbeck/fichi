import React from 'react';

const UserContext = React.createContext({
  signedIn: false,
  userId: '',
  email: '',
  name: '',
});

export default UserContext;
