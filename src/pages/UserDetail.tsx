import { useContext, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { UserContext } from '../context/UserProvider';
import { useParams } from 'react-router-dom';
import AgeIcon from '../icons/AgeIcon';
import OccupationIcon from '../icons/OccupationIcon';
import EducationIcon from '../icons/EducationIcon';
import { PostContext } from '../context/PostProvider';
import PostCard from '../components/PostCard';
import { SelfContext } from '../context/SelfProvider';

function UserDetail() {
  const { getUser } = useContext(UserContext);
  const { getPostsByUser } = useContext(PostContext);
  const { followedUsers: followed, toggleFollow } = useContext(SelfContext);
  const { id } = useParams();

  const [postsShowAmount, setPostsShowAmount] = useState(3);

  function showMorePosts() {
    setPostsShowAmount(postsShowAmount + 3);
  }

  const user = getUser(Number(id));
  const userPosts = user ? getPostsByUser(user.id) : [];

  return (
    <>
      <Header />
      <main>
        <section>
          {user ? (
            <div>
              <img />
              <div>
                <h2>
                  {user.firstName} {user.lastName}
                </h2>
                <span>{user.username}</span>
                <button onClick={() => toggleFollow(user.id)}>
                  {followed.includes(user.id) ? 'Unfollow' : 'Follow'}
                </button>
              </div>
              <div>
                <div>
                  <AgeIcon />
                  <span>{user.age} years old</span>
                </div>
                <div>
                  <OccupationIcon />
                  <span>
                    {user.company.title} at {user.company.name}
                  </span>
                </div>
                <div>
                  <EducationIcon />
                  <span>Studied at {user.university}</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2>User not found</h2>
            </div>
          )}
        </section>
        {/* Render 'Your Posts' section only if user has posted */}
        {user && userPosts.length > 0 && (
          <section>
            <div>
              <h2>{user.firstName}'s Posts</h2>
              <ul>
                {userPosts.slice(0, postsShowAmount).map(post => (
                  <li key={post.id}>
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
              {userPosts.length > postsShowAmount && (
                <button onClick={showMorePosts}>Show More</button>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

export default UserDetail;
