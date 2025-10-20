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
    <article onClick={() => navigate(`/user/${user.id}`)}>
      <div>
        <img />
        <div>
          <h3>
            {user.firstName} {user.lastName}
          </h3>
          <span>{user.username}</span>
        </div>
      </div>
      <button onClick={() => toggleFollow(user.id)}>
        {followed.includes(user.id) ? 'Unfollow' : 'Follow'}
      </button>
    </article>
  );
}

export default UserCard;
