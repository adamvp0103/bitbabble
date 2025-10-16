import React, { useEffect, useState, type ReactNode } from 'react';
import type { Post } from '../data/types';

interface PostContextType {
  posts: Post[];
}

export const PostContext = React.createContext<PostContextType>({
  posts: []
});

interface PostProviderProps {
  children: ReactNode;
}

function PostProvider({ children }: PostProviderProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('https://dummyjson.com/posts');
        if (!response.ok) {
          throw new Error(`Error fetching posts - status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data.posts);
      } catch (error: any) {
        console.error(error.message);
      }
    }

    fetchPosts();
  }, []);

  return (
    <PostContext.Provider value={{ posts }}>
      {children}
    </PostContext.Provider>
  );
}

export default PostProvider;
