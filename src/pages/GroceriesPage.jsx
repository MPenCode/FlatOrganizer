import { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';

export default function GroceriesPage() {
  const [input, setInput] = useState('');
  const { state, addItem, removeItem } = useGlobalContext();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Shopping List</h2>
      <div className="flex gap-2 mb-4">
        <input
          className="input input-bordered w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={() => {
            if (input.trim()) {
              addItem(input.trim());
              setInput('');
            }
          }}
          className="btn btn-primary"
        >
          Add
        </button>
      </div>
      <ul className="list-disc pl-5">
        {state.shoppingList.map((item, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span>{item}</span>
            <button
              onClick={() => removeItem(index)}
              className="btn btn-xs btn-error"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
// This code defines a simple shopping list page using React. It allows users to add items to a shopping list and remove them. The state is managed using a global context, which is assumed to be defined in the `GlobalContext` file. The page includes an input field for adding items and a button to submit them. The list of items is displayed below the input, with each item having a remove button next to it.
