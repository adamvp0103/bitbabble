export interface Post {
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

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  username: string;
  university: string;
  company: {
    name: string;
    title: string;
  };
}