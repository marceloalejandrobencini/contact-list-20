import React, { createContext, useEffect, useState } from 'react';
import getState from '../flux';

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const { store: initialStore, actions: initialActions } = getState({
    getStore: () => store,
    setStore: (updatedStore) => setStore({ ...store, ...updatedStore }),
  });

  const [store, setStore] = useState(initialStore);

  const actions = {
    ...initialActions,
  };

  useEffect(() => {
    actions.loadContacts();
  }, []); 

  return (
    <ContactContext.Provider value={{ store, actions }}>
      {children}
    </ContactContext.Provider>
  );
};