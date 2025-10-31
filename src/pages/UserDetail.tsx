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
    <div className="page">
      <Header />
      <main className="main-content">
        <section className="account-info-section">
          {user ? (
            <div className="account-section-content">
              <div className="account-image-and-names">
                <img className="account-image" src={user.image} />
                <div className="account-name-and-follow-button">
                  <div className="account-name-and-username">
                    <h2 className="account-name">
                      {user.firstName} {user.lastName}
                    </h2>
                    <span>{user.username}</span>
                  </div>
                  <button
                    className={`follow-button user-detail-follow-button ${
                      followed.includes(user.id) ? 'active' : ''
                    }`}
                    onClick={() => toggleFollow(user.id)}
                  >
                    {followed.includes(user.id) ? 'Unfollow' : 'Follow'}
                  </button>
                </div>
              </div>
              <div className="account-stats">
                <div className="account-stat">
                  <AgeIcon />
                  <span>{user.age} years old</span>
                </div>
                <div className="account-stat">
                  <OccupationIcon />
                  <span>
                    {user.company.title} at {user.company.name}
                  </span>
                </div>
                <div className="account-stat">
                  <EducationIcon />
                  <span>Studied at {user.university}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="section-content">
              <h2 className="heading">User not found</h2>
            </div>
          )}
        </section>
        {/* Render 'User's Posts' section only if user has posted */}
        {user && userPosts.length > 0 && (
          <section className="section">
            <div className="section-content">
              <h2 className="heading">{user.firstName}'s Posts</h2>
              <ul className="card-list">
                {userPosts.slice(0, postsShowAmount).map(post => (
                  <li key={post.id}>
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
              {userPosts.length > postsShowAmount && (
                <button className="show-more-button" onClick={showMorePosts}>
                  Show More
                </button>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default UserDetail;
