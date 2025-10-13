import { useEffect, useState } from 'react';
import Header from '../components/Header';
import type { Post } from '../data/types';
import PostCard from '../components/PostCard';
import Footer from '../components/Footer';

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('https://dummyjson.com/posts');
        if (!response.ok) {
          throw new Error(
            `Error fetching posts for home page - status: ${response.status}`
          );
        }
        const data = await response.json();
        setPosts(data.posts);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <>
      <Header />
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
            {followedPosts.slice(0, followingShowAmount).map(post => (
              <PostCard post={post} />
            ))}
            {followedPosts.length > followingShowAmount && (
              <button onClick={showMoreFollowing}>Show More</button>
            )}
          </div>
        </section>
      )}
      <section>
        <div>
          <h2>All Posts</h2>
          {posts.slice(0, allPostsShowAmount).map(post => (
            <PostCard post={post} />
          ))}
          {posts.length > allPostsShowAmount && (
            <button onClick={showMoreAllPosts}>Show More</button>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
