import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useContext } from 'react';
import { PostContext } from '../context/PostProvider';
import { UserContext } from '../context/UserProvider';
import ViewIcon from '../icons/ViewIcon';
import LikeIcon from '../icons/LikeIcon';
import DislikeIcon from '../icons/DislikeIcon';

function PostDetail() {
  const { getPost } = useContext(PostContext);
  const { getUser } = useContext(UserContext);
  const { id } = useParams();

  const post = id ? getPost(id) : null;
  const user = post ? getUser(post.userId) : null;

  return (
    <>
      <Header />
      <main>
        <section>
          <div>
            {post ? (
              <>
                <h2>{post.title}</h2>
                <div>
                  <div>
                    <img />
                    <div>
                      <span>
                        {user?.firstName} {user?.lastName}
                      </span>
                      <span>{user?.username}</span>
                    </div>
                  </div>
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
                </div>
                <ul>
                  {post.tags.map(tag => (
                    <li key={tag}>{tag.toUpperCase()}</li>
                  ))}
                </ul>
                <p>{post.body}</p>
              </>
            ) : (
              <h2>Post not found</h2>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default PostDetail;
