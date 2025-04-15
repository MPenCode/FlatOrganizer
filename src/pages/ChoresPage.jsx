import React, { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';

export default function ChoresPage() {
  const { state, addChore, removeChore, markChoreDone } = useGlobalContext();
  const flatmates = state.flatmates;
  const [assignedTo, setAssignedTo] = useState([]);
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('weekly');
  const [points, setPoints] = useState(1);

  const handleAdd = () => {
    if (!name.trim()) return;
    const newChore = {
      id: Date.now(),
      name: name.trim(),
      frequency,
      points: Number(points),
      lastDone: null,
      nextDue: null,
      assignedTo: [...assignedTo],
    };
    addChore(newChore);
    setName('');
    setPoints(1);
    setFrequency('weekly');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">House Chores</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
        <input
          className="input input-bordered"
          placeholder="Chore name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="select select-bordered"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <input
          type="number"
          className="input input-bordered"
          placeholder="Points"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          min={1}
        />
        <div className="mb-4">
          <p className="font-semibold mb-1">Assign to flatmates:</p>
          <div className="flex flex-wrap gap-2">
            {flatmates.map((mate) => (
              <label key={mate.id} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={assignedTo.includes(mate.id)}
                  onChange={() => {
                    setAssignedTo((prev) =>
                      prev.includes(mate.id)
                        ? prev.filter((id) => id !== mate.id)
                        : [...prev, mate.id]
                    );
                  }}
                  className="checkbox checkbox-sm"
                />
                {mate.name}
              </label>
            ))}
          </div>
        </div>
      </div>
      <button onClick={handleAdd} className="btn btn-primary mb-6">
        Add Chore
      </button>

      <ul className="space-y-2">
        {state.chores.map((chore) => (
          <li
            key={chore.id}
            className="bg-base-200 p-3 rounded flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">{chore.name}</div>
              <div className="text-sm opacity-70">
                {chore.frequency} • {chore.points} pts
              </div>
              {chore.assignedTo.length > 0 && (
                <div className="text-xs text-gray-400">
                  Assigned to:{' '}
                  {chore.assignedTo
                    .map((id) => {
                      const mate = state.flatmates.find((f) => f.id === id);
                      return mate ? mate.name : 'Unknown';
                    })
                    .join(', ')}
                </div>
              )}
              <div className="text-xs text-gray-400">
                Last done:{' '}
                {chore.lastDone
                  ? new Date(chore.lastDone).toLocaleDateString()
                  : '—'}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => markChoreDone(chore.id)}
                className="btn btn-xs btn-success"
              >
                Mark Done
              </button>
              <button
                onClick={() => removeChore(chore.id)}
                className="btn btn-xs btn-error"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
