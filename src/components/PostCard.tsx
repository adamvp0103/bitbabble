import type { Post } from '../data/types';
import ViewIcon from '../icons/ViewIcon';
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
  const { self } = useContext(SelfContext);

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
