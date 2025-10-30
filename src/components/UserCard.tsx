import { useNavigate } from 'react-router-dom';
import type { User } from '../data/types';
import { useContext } from 'react';
import { SelfContext } from '../context/SelfProvider';

interface UserCardProps {
  user: User;
}

function UserCard({ user }: UserCardProps) {
  const navigate = useNavigate();

  const { followedUsers: followed, toggleFollow } = useContext(SelfContext);

  return (
    <article className="user-card" onClick={() => navigate(`/user/${user.id}`)}>
      <div className="user-card-info">
        <img className="user-card-image" />
        <div>
          <h3 className="user-card-name">
            {user.firstName} {user.lastName}
          </h3>
          <span>{user.username}</span>
        </div>
      </div>
      <button
        className={`follow-button ${
          followed.includes(user.id) ? 'active' : ''
        }`}
        onClick={event => {
          event.stopPropagation();
          toggleFollow(user.id);
        }}
      >
        {followed.includes(user.id) ? 'Unfollow' : 'Follow'}
      </button>
    </article>
  );
}

export default UserCard;
