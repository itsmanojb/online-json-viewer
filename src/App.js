import { useState } from 'react';
import './App.css';
import AboutModal from './components/AboutModal';

function App() {
  const [modal, setModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [jsonInput, setJsonInput] = useState('');

  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  const handleCopyClick = () => {
    copyTextToClipboard(jsonInput)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clearWhiteSpace = () => {
    const cleared = JSON.stringify(JSON.parse(jsonInput));
    setJsonInput(cleared);
  };

  const formatJSON = () => {
    const formatted = JSON.stringify(JSON.parse(jsonInput), null, 2);
    setJsonInput(formatted);
  };

  const clearJson = () => setJsonInput('');

  return (
    <main className="app">
      <header>
        <div className="tabs" role="tablist">
          <div className="tab" role="tab">
            Viewer
          </div>
          <div className="tab active" role="tab">
            Text
          </div>
        </div>
      </header>
      <section>
        <div className="toolbox">
          <div className="menus">
            <div className="menu" role="button">
              Paste
            </div>
            <div
              className={`menu ${jsonInput.length ? '' : 'disabled'}`}
              role="button"
              onClick={() => handleCopyClick()}
            >
              Copy
            </div>
            <div className="divider"></div>

            <div
              className={`menu ${jsonInput.length ? '' : 'disabled'}`}
              role="button"
              onClick={() => formatJSON()}
            >
              Format
            </div>
            <div
              className={`menu ${jsonInput.length ? '' : 'disabled'}`}
              role="button"
              onClick={() => clearWhiteSpace()}
            >
              Remove Whitespace
            </div>
            <div className="divider"></div>

            <div
              className={`menu ${jsonInput.length ? '' : 'disabled'}`}
              role="button"
              onClick={() => clearJson()}
            >
              Clear
            </div>

            <div className="divider"></div>
            <div className="menu" role="button">
              Load Remote Data
            </div>
          </div>
          <div className="menus">
            <div className="menu" role="button" onClick={() => setModal(true)}>
              About
            </div>
          </div>
        </div>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          spellCheck="false"
        ></textarea>
      </section>
      {modal && <AboutModal onModalClose={() => setModal(false)} />}
    </main>
  );
}

export default App;
