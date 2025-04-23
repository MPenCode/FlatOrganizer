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

  const addFlatmate = (flatmate) =>
    dispatch({ type: 'ADD_FLATMATE', payload: flatmate });
  const removeFlatmate = (id) =>
    dispatch({ type: 'REMOVE_FLATMATE', payload: id });
  const addChore = (chore) => dispatch({ type: 'ADD_CHORE', payload: chore });
  const removeChore = (id) => dispatch({ type: 'REMOVE_CHORE', payload: id });
  const markChoreDone = (id) =>
    dispatch({ type: 'MARK_CHORE_DONE', payload: { id } });
  const addFinanceEntry = (financeEntries) =>
    dispatch({ type: 'ADD_FINANCE_ENTRY', payload: financeEntries });
  const removeFinanceEntry = (id) =>
    dispatch({ type: 'REMOVE_FINANCE_ENTRY', payload: id });

  // Add other actions as needed

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
        // Expose wrapped actions if you want convenience:
        addItem,
        removeItem,
        addFlatmate,
        removeFlatmate,
        addChore,
        removeChore,
        markChoreDone,
        addFinanceEntry,
        removeFinanceEntry,
        // Add other actions here
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
