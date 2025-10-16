import React, { useEffect, useState, type ReactNode } from 'react';
import type { User } from '../data/types';

interface UserContextType {
  users: User[];
}

export const UserContext = React.createContext<UserContextType>({
  users: []
});

interface UserProviderProps {
  children: ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
  const [users, setUsers] = useState<User[]>([]);

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
    <UserContext.Provider value={{ users }}>{children}</UserContext.Provider>
  );
}

export default UserProvider;
