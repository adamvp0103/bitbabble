import { useEffect, useState } from 'react';
import type { Post, User } from '../data/types';
import ViewIcon from '../icons/ViewIcon';
import LikeIcon from '../icons/LikeIcon';
import DislikeIcon from '../icons/DislikeIcon';

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser(id: number) {
      try {
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        if (!response.ok) {
          throw new Error(
            `Error fetching user for post card - status: ${response.status}`
          );
        }
        const data = await response.json();
        setUser(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser(post.userId);
  }, []);

  return (
    <li key={post.id}>
      <span>{post.title}</span>
      <div>
        <img />
        <span>
          {user?.firstName} {user?.lastName}
        </span>
      </div>
      <p>{post.body}</p>
      <ul>
        {post.tags.map(tag => (
          <li key={tag}>{tag.toUpperCase()}</li>
        ))}
      </ul>
      <div>
        <div>
          <ViewIcon />
          {post.views}
        </div>
        <div>
          <LikeIcon />
          {post.reactions.likes}
        </div>
        <div>
          <DislikeIcon />
          {post.reactions.dislikes}
        </div>
      </div>
    </li>
  );
}

export default PostCard;
