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
    <>
      <Header />
      <section>
        <div>
          <label htmlFor="search-input">Search</label>
          <div>
            <div>
              <SearchIcon />
              <input
                id="search-input"
                value={searchValue}
                placeholder="Search posts or users..."
                onChange={updateSearchValue}
              />
            </div>
            <button onClick={search}>Search</button>
          </div>
        </div>
      </section>
      {hasSearched && (
        <section>
          <div>
            <h2>Post Results</h2>
            {postResults.length > 0 ? (
              <>
                <ul>
                  {postResults.slice(0, postResultsShowAmount).map(result => (
                    <li key={result.id}>
                      <PostCard
                        post={result}
                        user={users.find(user => user.id === result.userId)!}
                      />
                    </li>
                  ))}
                </ul>
                {postResults.length > postResultsShowAmount && (
                  <button onClick={showMorePostResults}>Show More</button>
                )}
              </>
            ) : (
              <span>None.</span>
            )}
          </div>
        </section>
      )}
      {hasSearched && (
        <section>
          <div>
            <h2>User Results</h2>
            {userResults.length > 0 ? (
              <>
                <ul>
                  {userResults.slice(0, userResultsShowAmount).map(result => (
                    <li key={result.id}>
                      <UserCard user={result} />
                    </li>
                  ))}
                </ul>
                {userResults.length > userResultsShowAmount && (
                  <button onClick={showMoreUserResults}>Show More</button>
                )}
              </>
            ) : (
              <span>None.</span>
            )}
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}

export default Search;
