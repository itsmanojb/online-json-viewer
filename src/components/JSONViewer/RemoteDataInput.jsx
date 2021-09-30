import { useState } from 'react';
import style from './viewer.module.css';
import styles from '../components.module.css';

const RemoteDataInput = ({ onDataLoad, onError, onCancel }) => {
  const [url, setUrl] = useState('');
  const [invalidUrl, setInvalidUrl] = useState(false);
  const [fetching, setFetching] = useState(false);

  function checkUrl(url) {
    setUrl(url);
    const expression =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    const regex = new RegExp(expression);

    if (url.match(regex)) {
      setInvalidUrl(false);
    } else {
      setInvalidUrl(true);
    }
  }

  function loadRemoteData(e) {
    e.preventDefault();
    if (!url || invalidUrl) return;

    setFetching(true);
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setFetching(false);
          onDataLoad(result);
        },
        (error) => {
          setFetching(false);
          onError(error);
        }
      );
  }

  return (
    <div className={styles.modal_ui} onClick={onCancel}>
      <div
        className={styles.modal_wrapper}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={style.modal_content}>
          <div className={style.modal_body}>
            <h4>Load Remote Data</h4>
            <form
              noValidate
              onSubmit={loadRemoteData}
              className={style.form_body}
            >
              <input
                type="url"
                value={url}
                onChange={(e) => checkUrl(e.target.value)}
                placeholder="Enter URL"
              />
              <button type="submit" disabled={!url || fetching || invalidUrl}>
                {fetching ? 'Fetching...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoteDataInput;
