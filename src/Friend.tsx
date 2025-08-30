interface FriendProps {
  name: string;
  image: string;
  balance: number;
  setOpenedFriend: React.Dispatch<React.SetStateAction<number | null>>;
  id: number;
  openedFriend: number | null;
}
function Friend({
  name,
  image,
  balance,
  setOpenedFriend,
  id,
  openedFriend,
}: FriendProps) {
  const formatBalance = (num: number): React.ReactElement => {
    if (balance < 0) {
      return (
        <span className="debt negative">
          {`You owe ${name} $${Math.abs(num)}`}
        </span>
      );
    } else if (balance === 0) {
      return <span className="debt even">{`You and ${name} are even`}</span>;
    }
    return (
      <span className="debt positive">{`${name} owes you $${Math.abs(
        num
      )}`}</span>
    );
  };

  return (
    <div className="friend">
      <div className="friendInfo">
        <img src={image} alt="avatar" />
        <div>
          <h3>{name}</h3>
        </div>
        <button
          onClick={() => {
            if (openedFriend === id) {
              setOpenedFriend(null);
            } else {
              setOpenedFriend(id);
            }
          }}
        >
          {openedFriend === id ? 'Close' : 'Open'}
        </button>
      </div>
      {formatBalance(balance)}
    </div>
  );
}

export default Friend;
