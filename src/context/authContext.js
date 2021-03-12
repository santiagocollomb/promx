import React, { useEffect, useState } from 'react';
import { app } from '../firebaseConfig';

export const Auth = React.createContext();

export const AuthContext = ({ children }) => {
  const [user, setUser] = useState();
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        app
          .firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then((userData) => {
            setUser({ ...userData.data(), id: userData.id });
            setShowChild(true);
          });
      } else {
        setShowChild(true);
        return;
      }
    });
  }, [user]);

  if (!showChild) {
    return <div />;
  } else {
    return (
      <Auth.Provider
        value={{
          user,
        }}
      >
        {children}
      </Auth.Provider>
    );
  }
};
