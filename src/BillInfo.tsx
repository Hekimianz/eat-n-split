import { useState } from 'react';
import type { Friend } from './types';
interface BillInfoProps {
  openedFriend: number | null;
  friends: Friend[];
  setFriends: React.Dispatch<React.SetStateAction<Friend[]>>;
  setOpenedFriend: React.Dispatch<React.SetStateAction<number | null>>;
}
function BillInfo({
  openedFriend,
  friends,
  setOpenedFriend,
  setFriends,
}: BillInfoProps) {
  const [bill, setBill] = useState<number | ''>('');
  const [expense, setExpense] = useState<number | ''>('');
  const friend = friends.find((f) => f.id === openedFriend)!;

  if (!friend) return;

  const canCalc = bill !== '' && expense !== '';
  const friendExpenseNum = canCalc ? (bill as number) - (expense as number) : 0;
  const formattedFriendExpense = Number.isInteger(friendExpenseNum)
    ? friendExpenseNum.toString()
    : friendExpenseNum.toFixed(2);

  const handleSubmit = () => {
    if (!bill || expense === '') return;
    console.log();
    const finalBalance = +expense - friendExpenseNum;
    setFriends((prev) =>
      prev.map((f) =>
        f.id === openedFriend ? { ...f, balance: f.balance + finalBalance } : f
      )
    );
    setBill('');
    setExpense('');
    setOpenedFriend(null);
  };
  return (
    <section id="billInfo">
      <h2>Split a bill with {friend.name}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          handleSubmit();
        }}
      >
        <div>
          <label htmlFor="bill">💰 Bill Value: </label>
          <input
            type="number"
            name="bill"
            id="bill"
            value={bill}
            onChange={(e) => {
              setExpense('');
              setBill(e.target.value === '' ? '' : +e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="expense">🧍‍♀️ Your Expense: </label>
          <input
            type="number"
            max={bill === '' ? undefined : (bill as number)}
            min={0}
            name="expense"
            id="expense"
            value={expense}
            onChange={(e) => {
              const raw = e.target.value;
              if (raw === '') return setExpense('');
              const next = +raw;
              if (bill !== '' && next > (bill as number)) {
                return setExpense(expense);
              }
              setExpense(next);
            }}
          />
        </div>
        <div>
          <span>👫 {friend.name}'s Expense:</span>
          <span id="friendExpense">
            {canCalc ? formattedFriendExpense : '-'}
          </span>
        </div>
        <div>
          <label htmlFor="who">🤑 Who is paying the bill: </label>
          <select name="who" id="who">
            <option value="you">You</option>
            <option value="friend">{friend.name}</option>
          </select>
        </div>
        <button>Split Bill</button>
      </form>
    </section>
  );
}

export default BillInfo;
