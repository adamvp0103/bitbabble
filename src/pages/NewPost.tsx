import { useContext, useState, type FormEvent } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import XIcon from '../icons/XIcon';
import { PostContext } from '../context/PostProvider';
import { SelfContext } from '../context/SelfProvider';
import { useNavigate } from 'react-router-dom';

function NewPost() {
  const { addPost } = useContext(PostContext);
  const { self } = useContext(SelfContext);

  const [titleValue, setTitleValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');
  const [tagValue, setTagValue] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);

  const navigate = useNavigate();

  function formatTag(str: string) {
    return str.trim().replace(' ', '').toUpperCase();
  }

  const canAddTag =
    tagValue.trim() &&
    !tagList.includes(formatTag(tagValue)) &&
    !/[^A-Z]/.test(formatTag(tagValue));

  function addTag() {
    setTagList([...tagList, formatTag(tagValue)]);
    setTagValue('');
  }

  function removeTag(tag: string) {
    setTagList(tagList.filter(t => t !== tag));
  }

  function post(event: FormEvent) {
    event.preventDefault();
    addPost({
      id: crypto.randomUUID(),
      title: titleValue.trim(),
      body: bodyValue.trim(),
      tags: tagList,
      reactions: {
        likes: 0,
        dislikes: 0
      },
      views: 0,
      userId: self.id
    });
    navigate('/account');
  }

  return (
    <div className="page">
      <Header />
      <main className="main-content">
        <section className="section">
          <div className="section-content">
            <h2 className="heading">New Post</h2>
            <form className="form" onSubmit={post}>
              <div className="form-field">
                <label htmlFor="title-input">Title</label>
                <input
                  id="title-input"
                  className="input"
                  value={titleValue}
                  onChange={event => setTitleValue(event.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="body-input">Body</label>
                <textarea
                  id="body-input"
                  className="input textarea"
                  value={bodyValue}
                  onChange={event => setBodyValue(event.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="tag-input">
                  Tags <span>(Optional)</span>
                </label>
                {tagList.length < 10 ? (
                  <>
                    <input
                      id="tag-input"
                      className="input"
                      value={tagValue}
                      onChange={event => setTagValue(event.target.value)}
                    />
                    <button
                      className="form-button"
                      type="button"
                      onClick={addTag}
                      disabled={!canAddTag}
                    >
                      Add Tag
                    </button>
                    {/[^a-zA-Z]/.test(tagValue.replaceAll(' ', '')) && (
                      <span className="invalid-input-message">
                        Tags can only contain letters.
                      </span>
                    )}
                    {tagList.includes(formatTag(tagValue)) && (
                      <span className="invalid-input-message">
                        You've already added this tag.
                      </span>
                    )}
                  </>
                ) : (
                  <span className="invalid-input-message">
                    You cannot add more than 10 tags.
                  </span>
                )}
                <ul className="tag-list">
                  {tagList.map(tag => (
                    <li
                      className="tag removable-tag"
                      key={tag}
                      onClick={() => removeTag(tag)}
                    >
                      <XIcon />
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="form-button submit-button" type="submit">
                Post
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default NewPost;
