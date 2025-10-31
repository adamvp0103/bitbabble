import { useContext, useState, type ChangeEvent } from 'react';
import Header from '../components/Header';
import SearchIcon from '../icons/SearchIcon';
import type { Post, User } from '../data/types';
import PostCard from '../components/PostCard';
import { PostContext } from '../context/PostProvider';
import { UserContext } from '../context/UserProvider';
import UserCard from '../components/UserCard';
import Footer from '../components/Footer';

function Search() {
  const { posts } = useContext(PostContext);
  const { users } = useContext(UserContext);

  const [searchValue, setSearchValue] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [postResults, setPostResults] = useState<Post[]>([]);
  const [userResults, setUserResults] = useState<User[]>([]);
  const [postResultsShowAmount, setPostResultsShowAmount] = useState(3);
  const [userResultsShowAmount, setUserResultsShowAmount] = useState(3);

  function updateSearchValue(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  function search() {
    if (!searchValue.trim()) {
      return;
    }

    setPostResults(
      posts.filter(post =>
        post.title.toLowerCase().includes(searchValue.trim().toLowerCase())
      )
    );
    setUserResults(
      users.filter(
        user =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(searchValue.trim().toLowerCase()) ||
          user.username.toLowerCase().includes(searchValue)
      )
    );
    setHasSearched(true);
  }

  function showMorePostResults() {
    setPostResultsShowAmount(postResultsShowAmount + 3);
  }

  function showMoreUserResults() {
    setUserResultsShowAmount(userResultsShowAmount + 3);
  }

  return (
    <div className="page">
      <Header />
      <main className="main-content">
        <section className="section">
          <div className="section-content">
            <label className="heading" htmlFor="search-input">
              Search
            </label>
            <div className="search-bar">
              <div className="search-field">
                <SearchIcon />
                <input
                  id="search-input"
                  className="search-input"
                  value={searchValue}
                  placeholder="Search posts or users..."
                  onChange={updateSearchValue}
                />
              </div>
              <button className="search-button" onClick={search}>
                Search
              </button>
            </div>
          </div>
        </section>
        {hasSearched && (
          <>
            <hr className="rule" />
            <section className="section">
              <div className="section-content">
                <h2 className="heading">Post Results</h2>
                {postResults.length > 0 ? (
                  <>
                    <ul className="card-list">
                      {postResults.slice(0, postResultsShowAmount).map(result => (
                        <li key={result.id}>
                          <PostCard post={result} />
                        </li>
                      ))}
                    </ul>
                    {postResults.length > postResultsShowAmount && (
                      <button
                        className="show-more-button"
                        onClick={showMorePostResults}
                      >
                        Show More
                      </button>
                    )}
                  </>
                ) : (
                  <span className="no-results-message">None.</span>
                )}
              </div>
            </section>
          </>
        )}
        {hasSearched && (
          <>
            <hr className="rule" />
            <section className="section">
              <div className="section-content">
                <h2 className="heading">User Results</h2>
                {userResults.length > 0 ? (
                  <>
                    <ul className="card-list">
                      {userResults.slice(0, userResultsShowAmount).map(result => (
                        <li key={result.id}>
                          <UserCard user={result} />
                        </li>
                      ))}
                    </ul>
                    {userResults.length > userResultsShowAmount && (
                      <button
                        className="show-more-button"
                        onClick={showMoreUserResults}
                      >
                        Show More
                      </button>
                    )}
                  </>
                ) : (
                  <span className="no-results-message">None.</span>
                )}
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Search;
