import React, { useEffect, useState, type ReactNode } from 'react';
import type { Post } from '../data/types';

interface PostContextType {
  posts: Post[];
  addPost: (post: Post) => void;
  getPost: (id: string) => Post | undefined;
  getPostsByUser: (id: number) => Post[];
  addLike: (id: string) => void;
  addDislike: (id: string) => void;
  removeLike: (id: string) => void;
  removeDislike: (id: string) => void;
}

export const PostContext = React.createContext<PostContextType>({
  posts: [],
  addPost: () => {},
  getPost: () => undefined,
  getPostsByUser: () => [],
  addLike: () => {},
  addDislike: () => {},
  removeLike: () => {},
  removeDislike: () => {}
});

interface PostProviderProps {
  children: ReactNode;
}

interface RawPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

function PostProvider({ children }: PostProviderProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  function addPost(post: Post) {
    setPosts([...posts, post]);
  }

  function getPost(id: number | string) {
    return posts.find(post => String(post.id) === String(id));
  }

  function getPostsByUser(id: number) {
    return posts.filter(post => post.userId === id);
  }

  function addLike(id: string) {
    const post = posts.find(post => post.id === id);

    if (!post) {
      return;
    }

    post.reactions.likes++;
  }

  function addDislike(id: string) {
    const post = posts.find(post => post.id === id);

    if (!post) {
      return;
    }

    post.reactions.dislikes++;
  }

  function removeLike(id: string) {
    const post = posts.find(post => post.id === id);

    if (!post) {
      return;
    }

    post.reactions.likes--;
  }

  function removeDislike(id: string) {
    const post = posts.find(post => post.id === id);

    if (!post) {
      return;
    }

    post.reactions.dislikes--;
  }

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('https://dummyjson.com/posts');
        if (!response.ok) {
          throw new Error(`Error fetching posts - status: ${response.status}`);
        }
        const data = await response.json();
        const rawPostData: RawPost[] = data.posts;

        // Convert numerical post IDs to strings
        const postData = rawPostData.map(post => ({
          ...post,
          id: String(post.id)
        }));

        setPosts(postData);
      } catch (error: any) {
        console.error(error.message);
      }
    }

    fetchPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        addPost,
        getPost,
        getPostsByUser,
        addLike,
        addDislike,
        removeLike,
        removeDislike
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export default PostProvider;
