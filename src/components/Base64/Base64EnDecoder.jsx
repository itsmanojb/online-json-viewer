import { useEffect, useState } from 'react';
import AboutModal from '../AboutModal';
import style from './base64.module.css';
import Base64Decoder from './Decoder64';
import Base64Encoder from './Encoder64';

const Base64EncoderDecoder = ({ view, onViewChange }) => {
  const [modal, setModal] = useState(false);
  const [encoder, setEncoder] = useState(view === 'base64-e');
  const [decoder, setDecoder] = useState(view === 'base64-d');

  useEffect(() => {
    setEncoder(view === 'base64-e');
    setDecoder(view === 'base64-d');
  }, [view]);

  function toggleView(mode) {
    if (mode === 'en') {
      setEncoder(true);
      setDecoder(false);
      onViewChange('base64-e');
    } else {
      setDecoder(true);
      setEncoder(false);
      onViewChange('base64-d');
    }
  }

  return (
    <div className="app">
      <header>
        <div className="tabs" role="tablist">
          <div
            className={`tab ${encoder && 'active'}`}
            role="tab"
            onClick={() => toggleView('en')}
          >
            Encoder
          </div>
          <div
            className={`tab ${decoder && 'active'}`}
            role="tab"
            onClick={() => toggleView('de')}
          >
            Decoder
          </div>
        </div>
      </header>
      <section>
        {encoder && <Base64Encoder onModalShow={(e) => setModal(e)} />}
        {decoder && <Base64Decoder />}
      </section>
      {modal && <AboutModal onModalClose={() => setModal(false)} />}
    </div>
  );
};

export default Base64EncoderDecoder;
