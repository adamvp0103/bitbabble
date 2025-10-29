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
    <article className="post-card" onClick={() => navigate(`/post/${post.id}`)}>
      <h3 className="card-title">{post.title}</h3>
      {user ? (
        <div
          className="post-card-author"
          onClick={event => {
            event.stopPropagation();
            navigate(`/user/${user.id}`);
          }}
        >
          <img className="post-card-author-image" />
          <span className="post-card-author-name">
            {user.firstName} {user.lastName}
          </span>
        </div>
      ) : (
        <span className="post-card-author">User not found</span>
      )}
      <p className="post-card-paragraph">{post.body}</p>
      <div className="post-card-tags-and-reactions">
        <ul className="tag-list">
          {post.tags.map(tag => (
            <li className="tag" key={tag}>
              {tag.toUpperCase()}
            </li>
          ))}
        </ul>
        <div className="post-card-reactions">
          <button
            className="reaction-button"
            style={{ color: isLiked(post.id) ? 'green' : 'black' }}
            onClick={event => {
              event.stopPropagation();
              toggleLiked(post.id);
            }}
          >
            <LikeIcon />
            {post.reactions.likes}
          </button>
          <button
            className="reaction-button"
            style={{ color: isDisliked(post.id) ? 'red' : 'black' }}
            onClick={event => {
              event.stopPropagation();
              toggleDisliked(post.id);
            }}
          >
            <DislikeIcon />
            {post.reactions.dislikes}
          </button>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
