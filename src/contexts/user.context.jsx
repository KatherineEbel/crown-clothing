import {createContext, useEffect, useState} from "react";
import {getUserDocFromAuth, listenForAuthChange} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: (_) => {},
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    return listenForAuthChange(async (user) => {
      if (!user) return setCurrentUser(null);
      setCurrentUser(await getUserDocFromAuth(user));
    });
  }, [])

  return (<UserContext.Provider value={{currentUser, setCurrentUser}}>
    {children}
  </UserContext.Provider>)
}

