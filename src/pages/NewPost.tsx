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
    <>
      <Header />
      <main>
        <section>
          <div>
            <h2>New Post</h2>
            <form onSubmit={post}>
              <div>
                <label htmlFor="title-input">Title</label>
                <input
                  id="title-input"
                  value={titleValue}
                  onChange={event => setTitleValue(event.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="body-input">Body</label>
                <textarea
                  id="body-input"
                  value={bodyValue}
                  onChange={event => setBodyValue(event.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="tag-input">
                  Tags <span>(Optional)</span>
                </label>
                {tagList.length < 10 ? (
                  <>
                    <input
                      id="tag-input"
                      value={tagValue}
                      onChange={event => setTagValue(event.target.value)}
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      disabled={!canAddTag}
                    >
                      Add Tag
                    </button>
                    {/[^a-zA-Z]/.test(tagValue.replaceAll(' ', '')) && (
                      <span>Tags can only contain letters.</span>
                    )}
                    {tagList.includes(formatTag(tagValue)) && (
                      <span>You've already added this tag.</span>
                    )}
                  </>
                ) : (
                  <span>You cannot add more than 10 tags.</span>
                )}
                <ul>
                  {tagList.map(tag => (
                    <li key={tag} onClick={() => removeTag(tag)}>
                      <XIcon />
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              <button type="submit">Post</button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default NewPost;
