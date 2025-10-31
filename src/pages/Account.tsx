import { useContext, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { SelfContext } from '../context/SelfProvider';
import AgeIcon from '../icons/AgeIcon';
import OccupationIcon from '../icons/OccupationIcon';
import EducationIcon from '../icons/EducationIcon';
import { PostContext } from '../context/PostProvider';
import PostCard from '../components/PostCard';
import AccountInfoForm from '../components/AccountInfoForm';

function Account() {
  const { self } = useContext(SelfContext);
  const { getPostsByUser } = useContext(PostContext);

  const [yourPostsShowAmount, setYourPostsShowAmount] = useState(3);

  const posts = getPostsByUser(self.id);

  function showMoreYourPosts() {
    setYourPostsShowAmount(yourPostsShowAmount + 3);
  }

  return (
    <div className="page">
      <Header />
      <main className="main-content">
        <section className="account-info-section">
          <div className="account-section-content">
            <div className="account-image-and-names">
              <img className="account-image" src={self.image} />
              <div className="account-name-and-username">
                <h2 className="account-name">
                  {self.firstName} {self.lastName}
                </h2>
                <span>{self.username}</span>
              </div>
            </div>
            <div className="account-stats">
              <div className="account-stat">
                <AgeIcon />
                <span>{self.age} years old</span>
              </div>
              <div className="account-stat">
                <OccupationIcon />
                <span>
                  {self.company.title} at {self.company.name}
                </span>
              </div>
              <div className="account-stat">
                <EducationIcon />
                <span>Studied at {self.university}</span>
              </div>
            </div>
          </div>
        </section>
        <hr className="rule" />
        <section className="section">
          <div className="section-content">
            <h2 className="heading">Edit Info</h2>
            <AccountInfoForm />
          </div>
        </section>
        {/* Render 'Your Posts' section only if user has posted */}
        {posts.length > 0 && (
          <>
            <hr className="rule" />
            <section className="section">
              <div className="section-content">
                <h2 className="heading">Your Posts</h2>
                <ul className="card-list">
                  {posts.slice(0, yourPostsShowAmount).map(post => (
                    <li key={post.id}>
                      <PostCard post={post} />
                    </li>
                  ))}
                </ul>
                {posts.length > yourPostsShowAmount && (
                  <button
                    className="show-more-button"
                    onClick={showMoreYourPosts}
                  >
                    Show More
                  </button>
                )}
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Account;
