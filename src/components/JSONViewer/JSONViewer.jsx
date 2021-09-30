import { useState } from 'react';
import useToastContext from '../Toast/useToastContext';
import AboutModal from '../AboutModal';
import TreeView from './TreeView';
import RemoteDataInput from './RemoteDataInput';

const JSONViewer = () => {
  const addToast = useToastContext();

  const [jsonInput, setJsonInput] = useState('');
  const [invalidJson, setInvalidJson] = useState(false);
  const [treeView, setTreeView] = useState(false);
  const [remote, setRemote] = useState(false);
  const [modal, setModal] = useState(false);

  const toggleTreeView = () => {
    if (!isInvalidJSON(jsonInput)) {
      setTreeView(true);
    } else {
      setTreeView(false);
      addToast({
        title: 'Failed!',
        description: 'Invalid JSON provided!',
        type: 'error',
      });
    }
  };

  function isInvalidJSON(value) {
    if (value) {
      try {
        JSON.parse(value);
        setInvalidJson(false);
        return false;
      } catch (e) {
        setInvalidJson(true);
        return true;
      }
    }
    setInvalidJson(false);
    return true;
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
      addToast({
        title: 'Failed!',
        description: 'Clipboard access qequired to perform this task!',
        type: 'error',
      });
      console.log('error', error);
    }
  };

  const handleInputChange = (value) => {
    setJsonInput(value);
    setInvalidJson(isInvalidJSON(value));
  };

  const handleCopyClick = () => {
    copyTextToClipboard(jsonInput)
      .then(() => {
        addToast({
          title: 'Done!',
          description: 'Copied to clipboard!',
          type: 'success',
        });
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
    if (isInvalidJSON(jsonInput)) {
      addToast({
        title: 'Failed!',
        description: 'Invalid JSON provided!',
        type: 'error',
      });
      return;
    }
    const cleared = JSON.stringify(JSON.parse(jsonInput));
    setJsonInput(cleared);
  };

  const formatJSON = () => {
    if (isInvalidJSON(jsonInput)) {
      addToast({
        title: 'Failed!',
        description: 'Invalid JSON provided!',
        type: 'error',
      });
      return;
    }
    const formatted = JSON.stringify(JSON.parse(jsonInput), null, 2);
    setJsonInput(formatted);
  };

  const clearJson = () => setJsonInput('');

  function handleRemoteData(data, isError) {
    if (isError) {
      addToast({
        title: 'Error!',
        description:
          'Failed to load remote data. Check developer console to know more.',
        type: 'error',
      });
    } else {
      addToast({
        title: 'Success!',
        description: 'Remote JSON data has been loaded!',
        type: 'success',
      });
      setJsonInput(JSON.stringify(data, null, 2));
      setInvalidJson(false);
    }
    setRemote(false);
  }

  return (
    <div className="app">
      <header>
        <div className="tabs" role="tablist">
          <div
            className={`tab ${treeView && 'active'} ${
              (jsonInput.length === 0 || invalidJson) && 'disabled'
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
                Copy
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
              <div
                className="menu"
                role="button"
                onClick={() => setRemote(true)}
              >
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
      {remote && (
        <RemoteDataInput
          onError={() => handleRemoteData(null, true)}
          onDataLoad={(e) => handleRemoteData(e, false)}
          onCancel={() => setRemote(false)}
        />
      )}
      {modal && <AboutModal onModalClose={() => setModal(false)} />}
    </div>
  );
};

export default JSONViewer;
