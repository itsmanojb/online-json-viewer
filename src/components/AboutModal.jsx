import { useState } from 'react';
import style from './components.module.css';
import arrImg from '../assets/array.png';
import objImg from '../assets/object.png';

const AboutModal = ({ onModalClose }) => {
  const [tab, setTab] = useState('about');

  function closeModal() {
    onModalClose();
  }

  const dummyJson = {
    name: 'John Doe',
    age: 32,
    address: {
      street: '21 2nd Street',
      city: 'New York, NY',
    },
    phoneNumbers: [
      { type: 'home', number: '212 555-1234' },
      { type: 'fax', number: '646 555-4567' },
    ],
  };

  return (
    <div className={style.modal_ui}>
      <div className={style.modal_wrapper}>
        <div className={style.modal_content}>
          <div className={style.modal_header}>
            <button type="button" onClick={closeModal}>
              &times;
            </button>
            <div className={style.modal_title}>Online JSON Viewer</div>
            <div className="tabs" role="tablist">
              <div
                role="tab"
                onClick={() => setTab('about')}
                className={`tab ${tab === 'about' ? 'active' : ''}`}
              >
                About JSON
              </div>
              <div
                role="tab"
                onClick={() => setTab('exm')}
                className={`tab ${tab === 'exm' ? 'active' : ''}`}
              >
                Example
              </div>
              <div
                role="tab"
                onClick={() => setTab('app')}
                className={`tab ${tab === 'app' ? 'active' : ''}`}
              >
                About this application
              </div>
            </div>
          </div>
          <div className={style.modal_body}>
            {tab === 'about' && (
              <div>
                <p>
                  <strong>JSON</strong>, short for{' '}
                  <strong>JavaScript Object Notation</strong>, is a lightweight
                  computer data interchange format. JSON is a text-based,
                  human-readable format for representing simple data structures
                  and associative arrays (called objects).
                </p>
                <p>
                  Read more:{' '}
                  <a
                    href="https://www.json.org/json-en.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    json.org
                  </a>
                  ,{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/JSON"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Wikipedia
                  </a>
                  ,{' '}
                  <a
                    href="https://www.google.com/search?q=json"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google
                  </a>
                </p>
                <p>
                  <strong>In JSON, they take on these forms</strong>
                </p>
                <p>
                  <img src={objImg} alt="object" />
                </p>
                <p>
                  <img src={arrImg} alt="array" />
                </p>
              </div>
            )}
            {tab === 'exm' && <pre>{JSON.stringify(dummyJson, null, 4)}</pre>}
            {tab === 'app' && (
              <div>
                <p>
                  Convert JSON Strings to a Friendly Readable Format <br />
                  The application is built with{' '}
                  <a
                    href="https://reactjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ReactJS
                  </a>
                  .
                </p>
                <p>
                  Author:{' '}
                  <a
                    href="https://manojbarman.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Manoj Barman
                  </a>{' '}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
