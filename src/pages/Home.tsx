import { useContext, useState } from 'react';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import Footer from '../components/Footer';
import { PostContext } from '../context/PostProvider';
import { SelfContext } from '../context/SelfProvider';

function Home() {
  const { posts } = useContext(PostContext);
  const { followedUsers: followed } = useContext(SelfContext);

  const [followingShowAmount, setFollowingShowAmount] = useState(3);
  const [allPostsShowAmount, setAllPostsShowAmount] = useState(3);

  const followedPosts = posts.filter(post => followed.includes(post.userId));

  function showMoreFollowing() {
    setFollowingShowAmount(followingShowAmount + 3);
  }

  function showMoreAllPosts() {
    setAllPostsShowAmount(allPostsShowAmount + 3);
  }

  return (
    <div className="page">
      <Header />
      <main className="main-content">
        <section className="hero-section">
          <div className="hero-content">
            <span className="welcome-text">Welcome to</span>
            <h1 className="hero-title">BitBabble</h1>
            <span>A blog by and for developers.</span>
          </div>
        </section>
        {/* Render 'Following' section only if a followed user has a post */}
        {followedPosts.length > 0 && (
          <section className="section">
            <div className="section-content">
              <h2 className="heading">Following</h2>
              <ul className="card-list">
                {followedPosts.slice(0, followingShowAmount).map(post => (
                  <li key={post.id}>
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
              {followedPosts.length > followingShowAmount && (
                <button onClick={showMoreFollowing}>Show More</button>
              )}
            </div>
          </section>
        )}
        <section className="section">
          <div className="section-content">
            <h2 className="heading">All Posts</h2>
            <ul className="card-list">
              {posts.slice(0, allPostsShowAmount).map(post => (
                <li key={post.id}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
            {posts.length > allPostsShowAmount && (
              <button className="show-more-button" onClick={showMoreAllPosts}>
                Show More
              </button>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
