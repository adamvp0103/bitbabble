import type { User } from '../data/types';

interface UserCardProps {
  user: User;
}

function UserCard({ user }: UserCardProps) {
  return (
    <article>
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
