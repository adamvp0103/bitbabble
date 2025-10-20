import type { Post } from '../data/types';
import LikeIcon from '../icons/LikeIcon';
import DislikeIcon from '../icons/DislikeIcon';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import { useContext } from 'react';
import { SelfContext } from '../context/SelfProvider';

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  const navigate = useNavigate();
  const { getUser } = useContext(UserContext);
  const { self, isLiked, isDisliked, toggleLiked, toggleDisliked } =
    useContext(SelfContext);

  let user;

  if (post.userId === self.id) {
    user = self;
  } else {
    user = getUser(post.userId);
  }

  return (
    <article onClick={() => navigate(`/post/${post.id}`)}>
      <h3>{post.title}</h3>
      {user ? (
        <div>
          <img />
          <span>
            {user.firstName} {user.lastName}
          </span>
        </div>
      ) : (
        <span>User not found</span>
      )}
      <p>{post.body}</p>
      <ul>
        {post.tags.map(tag => (
          <li key={tag}>{tag.toUpperCase()}</li>
        ))}
      </ul>
      <div>
        <div
          style={{ color: isLiked(post.id) ? 'green' : 'black' }}
          onClick={event => {
            event.stopPropagation();
            toggleLiked(post.id);
          }}
        >
          <LikeIcon />
          {post.reactions.likes}
        </div>
        <div
          style={{ color: isDisliked(post.id) ? 'red' : 'black' }}
          onClick={event => {
            event.stopPropagation();
            toggleDisliked(post.id);
          }}
        >
          <DislikeIcon />
          {post.reactions.dislikes}
        </div>
      </div>
    </article>
  );
}

export default PostCard;
