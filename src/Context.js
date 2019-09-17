import React, { createContext, useReducer, useEffect } from 'react';

import Reducer from './Reducer';

const contextLocalStorage = 'context-ap-argentina';

const initialState = (localStorage.getItem(contextLocalStorage)) ? JSON.parse(localStorage.getItem(contextLocalStorage))
  : ({
    isAuth: false,
    currentUser: null,
    fces: [],
    currentFce: null,
  });

const Context = createContext(initialState);

export default Context;

export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    localStorage.setItem(contextLocalStorage, JSON.stringify(state));
  }, [state]);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
}
