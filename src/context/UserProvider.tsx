import React, { useEffect, useState, type ReactNode } from 'react';
import type { User } from '../data/types';

interface UserContextType {
  users: User[];
  getUser: (id: number) => User | undefined;
}

export const UserContext = React.createContext<UserContextType>({
  users: [],
  getUser: () => undefined
});

interface UserProviderProps {
  children: ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
  const [users, setUsers] = useState<User[]>([]);

  function getUser(id: number) {
    return users.find(user => user.id === id);
  }

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(
          'https://dummyjson.com/users?limit=0&select=id,firstName,lastName,age,username,university,company'
        );
        if (!response.ok) {
          throw new Error(`Error fetching users - status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (error: any) {
        console.error(error.message);
      }
    }

    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, getUser }}>{children}</UserContext.Provider>
  );
}

export default UserProvider;
