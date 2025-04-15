import { calculateNextDue } from '../utils/dateUtils';

export const reducer = (state, action) => {
  switch (action.type) {
    // 🛒 Shopping List
    case 'ADD_ITEM':
      return {
        ...state,
        shoppingList: [...state.shoppingList, action.payload],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        shoppingList: state.shoppingList.filter((_, i) => i !== action.payload),
      };

    // 💸 Finances (example)
    case 'ADD_EXPENSE':
      return {
        ...state,
        finances: [...state.finances, action.payload],
      };

    // 👤 User (example)
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
    // 👥 Flatmates
    case 'ADD_FLATMATE':
      return {
        ...state,
        flatmates: [...state.flatmates, action.payload],
      };
    case 'REMOVE_FLATMATE':
      return {
        ...state,
        flatmates: state.flatmates.filter((f) => f.id !== action.payload),
        // Chores
      };
    case 'ADD_CHORE':
      return {
        ...state,
        chores: [...state.chores, action.payload],
      };

    case 'REMOVE_CHORE':
      return {
        ...state,
        chores: state.chores.filter((c) => c.id !== action.payload),
      };

    case 'MARK_CHORE_DONE':
      return {
        ...state,
        chores: state.chores.map((c) =>
          c.id === action.payload.id
            ? {
                ...c,
                lastDone: new Date().toISOString(),
                nextDue: calculateNextDue(c.frequency),
              }
            : c
        ),
      };
    // 🏠 Finance
    case 'ADD_FINANCE_ENTRY':
      return {
        ...state,
        financeEntries: [...state.financeEntries, action.payload],
      };

    case 'REMOVE_FINANCE_ENTRY':
      return {
        ...state,
        financeEntries: state.financeEntries.filter(
          (e) => e.id !== action.payload
        ),
      };
  }
};
