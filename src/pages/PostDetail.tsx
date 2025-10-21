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
        <section>
          <div>
            <h2>Post not found</h2>
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
        <section>
          <div>
            <h2>{post.title}</h2>
            <div>
              {user ? (
                <div onClick={() => navigate(`/user/${user.id}`)}>
                  <img />
                  <div>
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                    <span>{user.username}</span>
                  </div>
                </div>
              ) : (
                <span>User not found</span>
              )}
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
            </div>
            <ul>
              {post.tags.map(tag => (
                <li key={tag}>{tag.toUpperCase()}</li>
              ))}
            </ul>
            <p>{post.body}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default PostDetail;
