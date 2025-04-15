import { useGlobalContext } from '../context/GlobalContext';
import { useState } from 'react';

export default function FinancePage() {
  const { state, addFinanceEntry, removeFinanceEntry } = useGlobalContext();
  const flatmates = state.flatmates;

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [sharedWith, setSharedWith] = useState([]);

  const handleSubmit = () => {
    if (!title || !amount || !paidBy || sharedWith.length === 0) return;
    const newEntry = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      paidBy: Number(paidBy),
      sharedWith: sharedWith.map(Number),
      date: new Date().toISOString(),
    };
    addFinanceEntry(newEntry);
    setTitle('');
    setAmount('');
    setPaidBy('');
    setSharedWith([]);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Flat Finances</h2>

      {/* Add Entry Form */}
      <div className="grid gap-2 mb-4 md:grid-cols-2">
        <input
          type="text"
          className="input input-bordered"
          placeholder="What was it for?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          className="input input-bordered"
          placeholder="Amount (€)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          className="select select-bordered"
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
        >
          <option value="">Who paid?</option>
          {flatmates.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>

        <div>
          <p className="font-semibold mb-1">Shared with:</p>
          <div className="flex flex-wrap gap-2">
            {flatmates.map((f) => (
              <label key={f.id} className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={sharedWith.includes(f.id.toString())}
                  onChange={() => {
                    setSharedWith((prev) =>
                      prev.includes(f.id.toString())
                        ? prev.filter((id) => id !== f.id.toString())
                        : [...prev, f.id.toString()]
                    );
                  }}
                />
                <span>{f.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button onClick={handleSubmit} className="btn btn-primary mb-6">
        Add Entry
      </button>

      {/* Finance Entries List */}
      <div className="space-y-3">
        {state.financeEntries.map((entry) => {
          const payer = flatmates.find((f) => f.id === entry.paidBy);
          const sharedNames = entry.sharedWith
            .map((id) => flatmates.find((f) => f.id === id)?.name)
            .filter(Boolean)
            .join(', ');

          return (
            <div
              key={entry.id}
              className="card bg-base-200 p-4 flex justify-between items-start"
            >
              <div>
                <div className="text-lg font-bold">{entry.title}</div>
                <div className="text-sm">
                  {payer?.name} paid €{entry.amount}
                </div>
                <div className="text-xs text-gray-500">
                  Shared with: {sharedNames}
                </div>
              </div>
              <button
                className="btn btn-xs btn-error"
                onClick={() => removeFinanceEntry(entry.id)}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
