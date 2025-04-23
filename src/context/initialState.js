export const initialState = {
  shoppingList: [],
  user: null,
  flatmates: [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
    { id: '3', name: 'Charlie' },
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
  financeEntries: [],
};
