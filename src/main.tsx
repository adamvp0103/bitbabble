import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import PostProvider from './context/PostProvider.tsx';
import UserProvider from './context/UserProvider.tsx';
import SelfProvider from './context/SelfProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostProvider>
      <UserProvider>
        <SelfProvider>
          <App />
        </SelfProvider>
      </UserProvider>
    </PostProvider>
  </StrictMode>
);
