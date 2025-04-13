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

    // 🧹 Chores (example)
    case 'ADD_CHORE':
      return {
        ...state,
        chores: [...state.chores, action.payload],
      };

    // 👤 User (example)
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
