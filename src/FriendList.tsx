import { useState } from 'react';
import Friend from './Friend';
import type { Friend as FriendT } from './types';

interface FriendProps {
  setOpenedFriend: React.Dispatch<React.SetStateAction<number | null>>;
  openedFriend: number | null;
  friends: FriendT[];
  setFriends: React.Dispatch<React.SetStateAction<FriendT[]>>;
}

function FriendList({
  setOpenedFriend,
  openedFriend,
  friends,
  setFriends,
}: FriendProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const [newFriend, setNewFriend] = useState<FriendT>({
    id: Date.now(),
    name: '',
    image: 'https://i.pravatar.cc/48',
    balance: 0,
  });
  const handleFriendAdd = (): void => {
    if (newFriend.name && newFriend.image) {
      setFriends((prev) => [...prev, newFriend]);
      setNewFriend((prev) => ({ ...prev, name: '', id: Date.now() }));
      setMenuOpen(false);
    }
  };
  return (
    <section id="friendList">
      {friends.map((d) => (
        <Friend
          key={d.id}
          name={d.name}
          image={d.image}
          balance={d.balance}
          setOpenedFriend={setOpenedFriend}
          id={d.id}
          openedFriend={openedFriend}
        />
      ))}
      {menuOpen && (
        <form
          className="friendMenu"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <label htmlFor="name">Friend Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={newFriend.name}
              onChange={(e) => {
                setNewFriend((prev) => ({ ...prev, name: e.target.value }));
              }}
            />
          </div>
          <div>
            <label htmlFor="pic">Image Url:</label>
            <input
              type="text"
              name="pic"
              id="pic"
              value={newFriend.image}
              onChange={(e) => {
                setNewFriend((prev) => ({ ...prev, image: e.target.value }));
              }}
            />
          </div>
          <button className="addBtn" onClick={handleFriendAdd}>
            Add
          </button>
        </form>
      )}
      <button
        className="addFriendBtn"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? 'Close' : 'Add Friend'}
      </button>
    </section>
  );
}

export default FriendList;
