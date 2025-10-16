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
  const { posts } = useContext(PostContext);

  const [yourPostsShowAmount, setYourPostsShowAmount] = useState(3);

  const userPosts = posts.filter(post => post.userId === self.id);

  function showMoreYourPosts() {
    setYourPostsShowAmount(yourPostsShowAmount + 3);
  }

  return (
    <>
      <Header />
      <main>
        <section>
          <div>
            <img />
            <div>
              <span>
                {self.firstName} {self.lastName}
              </span>
              <span>{self.username}</span>
            </div>
            <div>
              <div>
                <AgeIcon />
                <span>{self.age} years old</span>
              </div>
              <div>
                <OccupationIcon />
                <span>
                  {self.company.title} at {self.company.name}
                </span>
              </div>
              <div>
                <EducationIcon />
                <span>Studied at {self.university}</span>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div>
            <AccountInfoForm />
          </div>
        </section>
        {/* Render 'Your Posts' section only if user has posted */}
        {userPosts.length > 0 && (
          <section>
            <div>
              <h2>Your Posts</h2>
              <ul>
                {userPosts.slice(0, yourPostsShowAmount).map(post => (
                  <li key={post.id}>
                    <PostCard post={post} user={self!} />
                  </li>
                ))}
              </ul>
              {userPosts.length > yourPostsShowAmount && (
                <button onClick={showMoreYourPosts}>Show More</button>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Account;
