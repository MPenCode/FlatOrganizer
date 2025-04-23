import { calculateBalances } from '../utils/financeUtils';
import { useGlobalContext } from '../context/GlobalContext';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function FinancePage() {
  const { state, addFinanceEntry, removeFinanceEntry } = useGlobalContext();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('shopping');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [splitType, setSplitType] = useState('equal');
  const [customSplit, setCustomSplit] = useState([]);

  useEffect(() => {
    if (state.flatmates.length > 0) {
      setPaidBy(state.flatmates[0].id);
    }
  }, [state.flatmates]);

  const handleAddEntry = () => {
    let sharedWith = [];

    if (splitType === 'equal') {
      sharedWith = state.flatmates.map((f) => f.id);
    } else if (splitType === 'full') {
      sharedWith = state.flatmates
        .filter((f) => f.id !== paidBy)
        .map((f) => f.id);
    } else {
      sharedWith = customSplit;
    }

    const newEntry = {
      id: uuidv4(),
      title,
      category,
      amount: parseFloat(amount),
      paidBy,
      sharedWith,
      date: new Date().toISOString(),
    };

    addFinanceEntry(newEntry);

    // Reset form
    setTitle('');
    setAmount('');
    setSplitType('equal');
    setCustomSplit([]);
    setShowModal(false);
  };

  const balances = calculateBalances(state.financeEntries, state.flatmates);
  // console.log('Balances:', balances);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Finance Overview</h2>

      <button
        onClick={() => setShowModal(true)}
        className="btn btn-primary mb-4"
      >
        Add Payment
      </button>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box space-y-4">
            <h3 className="text-lg font-bold">Add Payment</h3>

            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <select
              className="select select-bordered w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="repeated">Repeated</option>
              <option value="settlement">Settlement</option>
              <option value="shopping">Shopping</option>
              <option value="food">Food</option>
              <option value="custom">Custom</option>
            </select>

            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <select
              className="select select-bordered w-full"
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
            >
              {state.flatmates.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered w-full"
              value={splitType}
              onChange={(e) => setSplitType(e.target.value)}
            >
              <option value="equal">Equal Split</option>
              <option value="full">Full (bought for others)</option>
              <option value="custom">Custom</option>
            </select>

            {splitType === 'custom' && (
              <div className="flex flex-col">
                {state.flatmates.map((f) => (
                  <label key={f.id} className="label cursor-pointer">
                    <span className="label-text">{f.name}</span>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={customSplit.includes(f.id)}
                      onChange={() =>
                        setCustomSplit((prev) =>
                          prev.includes(f.id)
                            ? prev.filter((id) => id !== f.id)
                            : [...prev, f.id]
                        )
                      }
                    />
                  </label>
                ))}
              </div>
            )}

            <div className="modal-action">
              <button onClick={handleAddEntry} className="btn btn-success">
                Add Entry
              </button>
              <button onClick={() => setShowModal(false)} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <h3 className="text-lg font-semibold mt-6 mb-2">Who owes whom</h3>
      <ul className="mb-6">
        {Object.entries(balances).map(([debtorId, creditors]) =>
          Object.entries(creditors).map(([creditorId, value]) => {
            const debtor = state.flatmates.find((f) => f.id === debtorId);
            const creditor = state.flatmates.find((f) => f.id === creditorId);
            return (
              <li key={debtorId + creditorId} className="text-sm">
                <span className="text-red-500">{debtor.name}</span> owes{' '}
                <span className="text-green-500">{creditor.name}</span> €
                {value.toFixed(2)}
              </li>
            );
          })
        )}
      </ul>

      <h3 className="text-lg font-semibold mb-2">Payment History</h3>
      <ul>
        {state.financeEntries.map((entry) => (
          <li
            key={entry.id}
            className="bg-base-200 p-3 rounded flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">{entry.title}</div>
              <div className="text-sm opacity-70">
                €{entry.amount.toFixed(2)} • {entry.category}
              </div>
              <div className="text-xs text-gray-400">
                Paid by:{' '}
                {state.flatmates.find((f) => f.id === entry.paidBy)?.name ||
                  'Unknown'}
              </div>
              <div className="text-xs text-gray-400">
                Shared with:{' '}
                {entry.sharedWith
                  .map((id) => {
                    const mate = state.flatmates.find((f) => f.id === id);
                    return mate ? mate.name : 'Unknown';
                  })
                  .join(', ')}
              </div>
              <div className="text-xs text-gray-400">
                Date: {new Date(entry.date).toLocaleDateString()}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => removeFinanceEntry(entry.id)}
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
