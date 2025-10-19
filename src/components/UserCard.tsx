import { useNavigate } from 'react-router-dom';
import type { User } from '../data/types';

interface UserCardProps {
  user: User;
}

function UserCard({ user }: UserCardProps) {
  const navigate = useNavigate();

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
      <button>Follow</button>
    </article>
  );
}

export default UserCard;
