import React, { createContext, useReducer, useEffect } from 'react';

import rootReducer, { initialState as rootReducerState } from './reducer';

const contextLocalStorage = 'context-ap-argentina';

const initialState = (localStorage.getItem(contextLocalStorage)) ? JSON.parse(localStorage.getItem(contextLocalStorage))
  : ({ ...rootReducerState });

const Context = createContext(initialState);

export default Context;

export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    localStorage.setItem(contextLocalStorage, JSON.stringify(state));
  }, [state]);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
}
