import React, { useState, type ReactNode } from 'react';
import type { User } from '../data/types';

interface SelfContextType {
  self: User;
  setSelf: (user: User) => void;
  followed: number[];
  toggleFollow: (id: number) => void;
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
  followed: [],
  toggleFollow: () => {}
});

interface SelfProviderProps {
  children: ReactNode;
}

function SelfProvider({ children }: SelfProviderProps) {
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

  const [followed, setFollowed] = useState<number[]>([]);

  function toggleFollow(id: number) {
    if (followed.includes(id)) {
      // Unfollow
      setFollowed(followed.filter(userId => userId !== id));
    } else {
      // Follow
      setFollowed([...followed, id]);
    }
  }

  return (
    <SelfContext.Provider value={{ self, setSelf, followed, toggleFollow }}>
      {children}
    </SelfContext.Provider>
  );
}

export default SelfProvider;
