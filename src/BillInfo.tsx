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
  setFriends,
  setOpenedFriend,
}: BillInfoProps) {
  const friend = friends.find((f) => f.id === openedFriend)!;
  if (!friend) return;
  return (
    <section id="billInfo">
      <h2>Split a bill with {friend.name}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOpenedFriend(null);
        }}
      >
        <div>
          <label htmlFor="bill">💰 Bill Value: </label>
          <input type="number" name="bill" id="bill" />
        </div>
        <div>
          <label htmlFor="expense">🧍‍♀️ Your Expense: </label>
          <input type="number" name="expense" id="expense" />
        </div>
        <div>
          <label htmlFor="friendExpense">👫 {friend.name}'s Expense:</label>
          <input type="number" name="friendExpense" id="friendExpense" />
        </div>
        <div>
          <label htmlFor="who">🤑 Who is paying the bill: </label>
          <input type="number" name="who" id="who" />
        </div>
        <button>Split Bill</button>
      </form>
    </section>
  );
}

export default BillInfo;
