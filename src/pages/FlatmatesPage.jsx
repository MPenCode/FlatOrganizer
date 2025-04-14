import { useGlobalContext } from '../context/GlobalContext';
import { useState } from 'react';

export default function FlatmatesPage() {
  const { state, addFlatmate, removeFlatmate } = useGlobalContext();
  const [name, setName] = useState('');

  const handleAdd = () => {
    if (name.trim()) {
      const newFlatmate = {
        id: Date.now(),
        name: name.trim(),
        points: 0,
      };
      addFlatmate(newFlatmate);
      setName('');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Flatmates</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="input input-bordered w-full"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleAdd} className="btn btn-primary">
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {state.flatmates.map((f) => (
          <li
            key={f.id}
            className="flex justify-between items-center bg-base-200 p-2 rounded"
          >
            <span>{f.name}</span>
            <button
              onClick={() => removeFlatmate(f.id)}
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
