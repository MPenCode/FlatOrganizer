export const initialState = {
  shoppingList: [],
  finances: [],
  chores: [],
  user: null,
  flatmates: [
    { id: 1, name: 'You', points: 0 },
    { id: 2, name: 'Flatmate 1', points: 0 },
    { id: 3, name: 'Flatmate 2', points: 0 },
    { id: 4, name: 'Flatmate 3', points: 0 },
    //  add more fake users for testing
  ],
  chores: [
    {
      id: 1,
      name: 'Clean kitchen',
      frequency: 'weekly',
      points: 3,
      lastDone: null,
      nextDue: null,
      assignedTo: [1, 2], // flatmate IDs
    },
  ],
};
