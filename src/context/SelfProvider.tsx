import React, { useState, type ReactNode } from 'react';
import type { User } from '../data/types';

interface SelfContextType {
  self: User;
  setSelf: (user: User) => void;
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
  setSelf: () => {}
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

  return (
    <SelfContext.Provider value={{ self, setSelf }}>
      {children}
    </SelfContext.Provider>
  );
}

export default SelfProvider;
