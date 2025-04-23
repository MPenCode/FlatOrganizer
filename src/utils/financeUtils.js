export function calculateBalances(financeEntries, flatmates) {
  if (!financeEntries || !flatmates) return {};
  const balances = {};

  // Initialize balance sheet
  flatmates.forEach((f) => {
    balances[f.id] = {};
    flatmates.forEach((other) => {
      if (f.id !== other.id) {
        balances[f.id][other.id] = 0;
      }
    });
  });

  financeEntries.forEach(({ amount, paidBy, sharedWith }) => {
    const splitAmount = amount / sharedWith.length;
    // console.log('Split amount:', splitAmount);

    sharedWith.forEach((userId) => {
      if (userId !== paidBy) {
        // userId owes their portion to the payer
        balances[userId][paidBy] += splitAmount;
        balances[paidBy][userId] -= splitAmount;
      }
    });
  });

  // Simplify: only positive values shown (A owes B)
  const simplified = {};

  flatmates.forEach((f) => {
    simplified[f.id] = {};
    flatmates.forEach((other) => {
      if (f.id !== other.id) {
        const net = balances[f.id][other.id] - balances[other.id][f.id];
        if (net > 0) {
          simplified[other.id][f.id] = net; // other owes f
        }
      }
    });
  });

  return simplified;
}

//   const rawBalances = {};
//   flatmates.forEach((f) => (rawBalances[f.id] = {}));

//   financeEntries.forEach(({ amount, paidBy, sharedWith }) => {
//     const splitAmount = amount / sharedWith.length;
//     sharedWith.forEach((person) => {
//       const isPayer = person === paidBy;
//       const owedAmount = isPayer ? amount - splitAmount : -splitAmount;

//       rawBalances[person][paidBy] =
//         (rawBalances[person][paidBy] || 0) + owedAmount;

//       // This ensures both sides track each other (for later simplification)
//       rawBalances[paidBy][person] =
//         (rawBalances[paidBy][person] || 0) - owedAmount;
//     });
//   });

//   const simplified = {};
//   flatmates.forEach((f) => (simplified[f.id] = {}));

//   flatmates.forEach((a) => {
//     flatmates.forEach((b) => {
//       if (a.id !== b.id) {
//         const diff =
//           (rawBalances[a.id][b.id] || 0) - (rawBalances[b.id][a.id] || 0);
//         if (diff > 0) {
//           simplified[b.id][a.id] = diff;
//         }
//       }
//     });
//   });

//   return simplified;
// }
