import React, { useContext, useState, type ReactNode } from 'react';
import type { User } from '../data/types';
import { PostContext } from './PostProvider';

interface SelfContextType {
  self: User;
  setSelf: (user: User) => void;
  followedUsers: number[];
  toggleFollow: (id: number) => void;
  isLiked: (id: string) => boolean;
  isDisliked: (id: string) => boolean;
  toggleLiked: (id: string) => void;
  toggleDisliked: (id: string) => void;
}

export const SelfContext = React.createContext<SelfContextType>({
  self: {
    id: 0,
    firstName: 'John',
    lastName: 'Doe',
    age: 42,
    username: 'john.doe.123',
    university: 'Some University',
    company: {
      name: 'Some Company',
      title: 'Worker'
    }
  },
  setSelf: () => {},
  followedUsers: [],
  toggleFollow: () => {},
  isLiked: () => false,
  isDisliked: () => false,
  toggleLiked: () => {},
  toggleDisliked: () => {}
});

interface SelfProviderProps {
  children: ReactNode;
}

function SelfProvider({ children }: SelfProviderProps) {
  const { addLike, addDislike, removeLike, removeDislike } =
    useContext(PostContext);

  const [self, setSelf] = useState<User>({
    id: 0,
    firstName: 'John',
    lastName: 'Doe',
    age: 42,
    username: 'john.doe.123',
    university: 'Some University',
    company: {
      name: 'Some Company',
      title: 'Worker'
    }
  });

  const [followedUsers, setFollowedUsers] = useState<number[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [dislikedPosts, setDislikedPosts] = useState<string[]>([]);

  function toggleFollow(id: number) {
    if (followedUsers.includes(id)) {
      // Unfollow
      setFollowedUsers(followedUsers.filter(userId => userId !== id));
    } else {
      // Follow
      setFollowedUsers([...followedUsers, id]);
    }
  }

  function isLiked(id: string) {
    return likedPosts.includes(id);
  }

  function isDisliked(id: string) {
    return dislikedPosts.includes(id);
  }

  function toggleLiked(id: string) {
    if (likedPosts.includes(id)) {
      // Unlike
      setLikedPosts(likedPosts.filter(postId => postId !== id));
      removeLike(id);
    } else {
      // Ensure not disliked, then like
      if (dislikedPosts.includes(id)) {
        setDislikedPosts(dislikedPosts.filter(postId => postId !== id));
        removeDislike(id);
      }
      setLikedPosts([...likedPosts, id]);
      addLike(id);
    }
  }

  function toggleDisliked(id: string) {
    if (dislikedPosts.includes(id)) {
      // Undislike
      setDislikedPosts(dislikedPosts.filter(postId => postId !== id));
      removeDislike(id);
    } else {
      // Ensure not liked, then dislike
      if (likedPosts.includes(id)) {
        setLikedPosts(likedPosts.filter(postId => postId !== id));
        removeLike(id);
      }
      setDislikedPosts([...dislikedPosts, id]);
      addDislike(id);
    }
  }

  return (
    <SelfContext.Provider
      value={{
        self,
        setSelf,
        followedUsers,
        toggleFollow,
        isLiked,
        isDisliked,
        toggleLiked,
        toggleDisliked
      }}
    >
      {children}
    </SelfContext.Provider>
  );
}

export default SelfProvider;
