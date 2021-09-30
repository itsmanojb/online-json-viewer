import { useState } from 'react';
import AboutModal from './components/AboutModal';
import './App.css';
import TreeView from './components/TreeView';

function App() {
  const [treeView, setTreeView] = useState(false);
  const [modal, setModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [invalidJson, setInvalidJson] = useState(false);

  const toggleTreeView = () => {
    if (!invalidJson) {
      setTreeView(true);
    } else {
      window.alert('Invalid JSON provided!');
    }
  };

  function isInvalidJSON(value) {
    if (value) {
      try {
        JSON.parse(value);
        setInvalidJson(false);
      } catch (e) {
        setInvalidJson(true);
      }
    } else {
      setInvalidJson(false);
    }
  }

  const pasteData = async () => {
    try {
      if ('clipboard' in navigator) {
        const text = await navigator.clipboard.readText();
        setJsonInput(text);
      } else {
        document.execCommand('paste');
      }
    } catch (error) {
      window.alert('Clipboard access qequired to perform this task!');
      console.log('error', error);
    }
  };

  const handleInputChange = (value) => {
    const v = value.trim();
    isInvalidJSON(v);
    setJsonInput(v);
  };

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

  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

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
          <div
            className={`tab ${treeView && 'active'} ${
              jsonInput.length === 0 && 'disabled'
            }`}
            role="tab"
            onClick={() => toggleTreeView()}
          >
            Viewer
          </div>
          <div
            className={`tab ${!treeView && 'active'}`}
            role="tab"
            onClick={() => setTreeView(false)}
          >
            Text
          </div>
        </div>
      </header>
      {treeView ? (
        <TreeView jsonInput={jsonInput} showModal={(e) => setModal(e)} />
      ) : (
        <section>
          <div className="toolbox">
            <div className="menus">
              <div className="menu" role="button" onClick={() => pasteData()}>
                Paste
              </div>
              <div
                className={`menu ${jsonInput.length === 0 && 'disabled'}`}
                role="button"
                onClick={() => handleCopyClick()}
              >
                {isCopied ? 'Copied' : 'Copy'}
              </div>
              <div className="divider"></div>

              <div
                className={`menu ${
                  (jsonInput.length === 0 || invalidJson) && 'disabled'
                }`}
                role="button"
                onClick={() => formatJSON()}
              >
                Format
              </div>
              <div
                className={`menu ${
                  (jsonInput.length === 0 || invalidJson) && 'disabled'
                }`}
                role="button"
                onClick={() => clearWhiteSpace()}
              >
                Remove Whitespace
              </div>
              <div className="divider"></div>

              <div
                className={`menu ${jsonInput.length === 0 && 'disabled'}`}
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
              <div
                className="menu"
                role="button"
                onClick={() => setModal(true)}
              >
                About
              </div>
            </div>
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => handleInputChange(e.target.value)}
            spellCheck="false"
            className={`${invalidJson && 'invalid'}`}
          ></textarea>
        </section>
      )}
      {modal && <AboutModal onModalClose={() => setModal(false)} />}
    </main>
  );
}

export default App;
