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
    <>
      <Header />
      <main>
        <section className="hero-section">
          <div className="hero-content">
            <span>Welcome to</span>
            <span className="hero-title">BitBabble</span>
            <span>A blog by and for developers.</span>
          </div>
        </section>
        {/* Render 'Following' section only if a followed user has a post */}
        {followedPosts.length > 0 && (
          <section>
            <div>
              <h2>Following</h2>
              <ul>
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
        <section>
          <div>
            <h2>All Posts</h2>
            <ul>
              {posts.slice(0, allPostsShowAmount).map(post => (
                <li key={post.id}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
            {posts.length > allPostsShowAmount && (
              <button onClick={showMoreAllPosts}>Show More</button>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
