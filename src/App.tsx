import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Search from './pages/Search';
import Account from './pages/Account';
import NewPost from './pages/NewPost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/account" element={<Account />} />
        <Route path="/new-post" element={<NewPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
