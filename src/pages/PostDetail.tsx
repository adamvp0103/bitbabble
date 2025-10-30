import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useContext } from 'react';
import { PostContext } from '../context/PostProvider';
import { UserContext } from '../context/UserProvider';
import LikeIcon from '../icons/LikeIcon';
import DislikeIcon from '../icons/DislikeIcon';
import { SelfContext } from '../context/SelfProvider';

function PostDetail() {
  const { getPost } = useContext(PostContext);
  const { getUser } = useContext(UserContext);
  const { self, isLiked, isDisliked, toggleLiked, toggleDisliked } =
    useContext(SelfContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const postNotFound = (
    <div className="page">
      <Header />
      <main className="main-content">
        <section className="section">
          <div className="section-content">
            <h2 className="heading">Post not found</h2>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );

  if (!id) {
    return postNotFound;
  }

  const post = getPost(id);

  if (!post) {
    return postNotFound;
  }

  let user;

  if (post.userId === self.id) {
    user = self;
  } else {
    user = getUser(post.userId);
  }

  return (
    <div className="page">
      <Header />
      <main className="main-content">
        <section className="section">
          <div className="section-content">
            <h2 className="heading post-title">{post.title}</h2>
            <div className="user-and-reactions">
              {user ? (
                <div
                  className="user-card-info"
                  onClick={() => navigate(`/user/${user.id}`)}
                >
                  <img className="user-card-image" />
                  <div>
                    <h3 className="user-card-name">
                      {user.firstName} {user.lastName}
                    </h3>
                    <span>{user.username}</span>
                  </div>
                </div>
              ) : (
                <span>User not found</span>
              )}
              <div className="post-detail-reactions">
                <div
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
                </div>
                <div
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
                </div>
              </div>
            </div>
            <ul className="tag-list">
              {post.tags.map(tag => (
                <li className="tag" key={tag}>
                  {tag.toUpperCase()}
                </li>
              ))}
            </ul>
            <p className="post-detail-paragraph">{post.body}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default PostDetail;
