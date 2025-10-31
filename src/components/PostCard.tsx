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
      <div className="post-title-and-author">
        <h3 className="card-title">{post.title}</h3>
        {user ? (
          <div
            className="post-card-author"
            onClick={event => {
              event.stopPropagation();
              if (user.id === self.id) {
                navigate('/account');
              } else {
                navigate(`/user/${user.id}`);
              }
            }}
          >
            <img className="post-card-author-image" src={user.image} />
            <span className="post-card-author-name">
              {user.firstName} {user.lastName}
            </span>
          </div>
        ) : (
          <span className="post-card-author">User not found</span>
        )}
      </div>
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
            className={`reaction-button like-button ${
              isLiked(post.id) ? 'active' : ''
            }`}
            onClick={event => {
              event.stopPropagation();
              toggleLiked(post.id);
            }}
          >
            <LikeIcon />
            {post.reactions.likes}
          </button>
          <button
            className={`reaction-button dislike-button ${
              isDisliked(post.id) ? 'active' : ''
            }`}
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
