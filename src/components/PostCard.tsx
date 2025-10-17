import type { Post, User } from '../data/types';
import ViewIcon from '../icons/ViewIcon';
import LikeIcon from '../icons/LikeIcon';
import DislikeIcon from '../icons/DislikeIcon';
import { useNavigate } from 'react-router-dom';

interface PostCardProps {
  post: Post;
  user: User;
}

function PostCard({ post, user }: PostCardProps) {
  const navigate = useNavigate();

  return (
    <article onClick={() => navigate(`/post/${post.id}`)}>
      <h3>{post.title}</h3>
      <div>
        <img />
        <span>
          {user.firstName} {user.lastName}
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
    </article>
  );
}

export default PostCard;
