import { useState } from 'react';
import FriendList from './FriendList';
import BillInfo from './BillInfo';
import data from './data';
import type { Friend } from './types';
function App() {
  const [openedFriend, setOpenedFriend] = useState<number | null>(null);
  const [friends, setFriends] = useState<Friend[]>(data);

  return (
    <main id="container">
      <FriendList
        setOpenedFriend={setOpenedFriend}
        openedFriend={openedFriend}
        friends={friends}
        setFriends={setFriends}
      />
      <BillInfo
        openedFriend={openedFriend}
        friends={friends}
        setFriends={setFriends}
        setOpenedFriend={setOpenedFriend}
      />
    </main>
  );
}

export default App;
