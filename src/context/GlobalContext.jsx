import { createContext, useReducer, useContext } from 'react';
import { reducer } from './reducer';
import { initialState } from './initialState';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Optional: add wrapped actions to keep code clean
  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };
  const removeItem = (index) =>
    dispatch({ type: 'REMOVE_ITEM', payload: index });

  // Add other actions as needed

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
        // Expose wrapped actions if you want convenience:
        addItem,
        removeItem,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the GlobalContext
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
