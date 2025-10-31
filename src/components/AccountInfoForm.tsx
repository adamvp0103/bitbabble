import { useContext, useState, type FormEvent } from 'react';
import { UserContext } from '../context/UserProvider';
import { SelfContext } from '../context/SelfProvider';

function AccountInfoForm() {
  const { self, setSelf } = useContext(SelfContext);
  const { users } = useContext(UserContext);

  const [firstNameValue, setFirstNameValue] = useState(self.firstName);
  const [lastNameValue, setLastNameValue] = useState(self.lastName);
  const [usernameValue, setUsernameValue] = useState(self.username);
  const [ageValue, setAgeValue] = useState(self.age);
  const [companyValue, setCompanyValue] = useState(self.company.name);
  const [positionValue, setPositionValue] = useState(self.company.title);
  const [universityValue, setUniversityValue] = useState(self.university);

  const usernameTaken = users.some(
    user => user.username === usernameValue.trim().toLowerCase()
  );
  const usernameHasSpaces = usernameValue.trim().includes(' ');

  function resetFields() {
    setFirstNameValue(self.firstName);
    setLastNameValue(self.lastName);
    setUsernameValue(self.username);
    setAgeValue(self.age);
    setCompanyValue(self.company.name);
    setPositionValue(self.company.title);
    setUniversityValue(self.university);
  }

  function cleanInput(str: string) {
    const words = str.trim().replace(/\s+/g, ' ').split(' ');
    return words
      .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
      .join(' ');
  }

  function applyChanges(event: FormEvent) {
    event.preventDefault();
    setSelf({
      id: self.id,
      firstName: cleanInput(firstNameValue),
      lastName: cleanInput(lastNameValue),
      age: ageValue,
      username: usernameValue.trim().toLowerCase(),
      image: self.image,
      university: cleanInput(universityValue),
      company: {
        name: cleanInput(companyValue),
        title: cleanInput(positionValue)
      }
    });
  }

  return (
    <form className="form" onSubmit={applyChanges}>
      <div className="form-field">
        <label htmlFor="first-name-input">First Name</label>
        <input
          id="first-name-input"
          className="input"
          value={firstNameValue}
          onChange={event => setFirstNameValue(event.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="last-name-input">Last Name</label>
        <input
          id="last-name-input"
          className="input"
          value={lastNameValue}
          onChange={event => setLastNameValue(event.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="username-input">Username</label>
        <input
          id="username-input"
          className="input"
          value={usernameValue}
          onChange={event => setUsernameValue(event.target.value)}
        />
        {usernameTaken && <span>This username is already taken.</span>}
        {usernameHasSpaces && <span>Your username cannot contain spaces.</span>}
      </div>
      <div className="form-field">
        <label htmlFor="age-input">Age</label>
        <input
          id="age-input"
          className="input"
          type="number"
          min={13}
          value={ageValue}
          onChange={event => setAgeValue(Number(event.target.value))}
        />
      </div>
      <div className="form-field">
        <label htmlFor="company-input">Company</label>
        <input
          id="company-input"
          className="input"
          value={companyValue}
          onChange={event => setCompanyValue(event.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="position-input">Position</label>
        <input
          id="position-input"
          className="input"
          value={positionValue}
          onChange={event => setPositionValue(event.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="university-input">College/University</label>
        <input
          id="university-input"
          className="input"
          value={universityValue}
          onChange={event => setUniversityValue(event.target.value)}
        />
      </div>
      <div className="form-buttons">
        <button
          className="form-button reset-button"
          type="button"
          onClick={resetFields}
        >
          Reset Fields
        </button>
        <button className="form-button submit-button" type="submit">
          Apply Changes
        </button>
      </div>
    </form>
  );
}

export default AccountInfoForm;
