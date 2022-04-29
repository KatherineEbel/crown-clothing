import {createContext, useEffect, useReducer} from "react";
import {getUserDocFromAuth, listenForAuthChange} from "../utils/firebase/firebase.utils";
import { createAction} from "../utils/reducer/reducer.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: (_) => {},
});

const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const userReducer = (state, action) => {
  console.log(action, 'dispatched')
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { currentUser: payload }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`)
  }
}

const INITIAL_STATE = {
  currentUser: null,
}

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
  }
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