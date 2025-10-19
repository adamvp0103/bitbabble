import { useContext, useState } from 'react';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import Footer from '../components/Footer';
import { PostContext } from '../context/PostProvider';

function Home() {
  const { posts } = useContext(PostContext);

  const [followedUserIds, setFollowedUserIds] = useState<number[]>([]);
  const [followingShowAmount, setFollowingShowAmount] = useState(3);
  const [allPostsShowAmount, setAllPostsShowAmount] = useState(3);

  const followedPosts = posts.filter(post =>
    followedUserIds.some(id => post.userId === id)
  );

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
        <section>
          <div>
            <span>Welcome to</span>
            <span>BitBabble</span>
            <span>A blog by and for developers.</span>
          </div>
        </section>
        {/* Render 'Following' section only if a followed user has a post */}
        {posts.some(post => followedUserIds.some(id => post.userId === id)) && (
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
