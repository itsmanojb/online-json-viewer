import { useState } from 'react';
import useToastContext from '../Toast/useToastContext';
import style from './base64.module.css';

const Base64Decoder = ({ onModalShow }) => {
  const addToast = useToastContext();

  const [input, setInput] = useState('');
  const [inputInvalid, setInputInvalid] = useState(false);
  const [output, setOutput] = useState('');
  const [auto, setAuto] = useState(false);
  const [lineWise, setLineWise] = useState(false);

  const handleCopyClick = () => {
    copyTextToClipboard(output)
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

  const handleInputChange = (e) => {
    setInput(e);
    if (isValidEntry(e)) {
      setInputInvalid(false);
      if (auto) {
        if (lineWise) {
          const raw = e.split('\n');
          const joined = raw.map((line) => atob(line)).join('\n');
          setOutput(joined);
        } else {
          doDecoding();
        }
      }
    } else {
      setInputInvalid(true);
      setOutput('Malformed Input');
    }
  };

  function isValidEntry(e) {
    try {
      return btoa(atob(e)) === e;
    } catch (err) {
      return false;
    }
  }

  const handleLiveModeChange = (e) => {
    setAuto(e);
    if (e) {
      if (lineWise) {
        const raw = input.split('\n');
        const joined = raw.map((line) => atob(line)).join('\n');
        setOutput(joined);
      } else {
        doDecoding();
      }
    }
  };

  const handleLineWiseChange = (e) => {
    setLineWise(e);
    if (e) {
      const raw = input.split('\n');
      const joined = raw.map((line) => atob(line)).join('\n');
      if (auto) {
        setOutput(joined);
      }
    } else {
      const joined = atob(input);
      if (auto) {
        setOutput(joined);
      }
    }
  };

  function doDecoding() {
    if (isValidEntry(input)) {
      setInputInvalid(false);

      let decoded;
      if (lineWise) {
        const raw = input.split('\n');
        const joined = raw.map((line) => atob(line)).join('\n');
        decoded = joined;
      } else {
        decoded = atob(input);
      }
      setOutput(decoded);
    } else {
      setInputInvalid(true);
      setOutput('Malformed Input');
      addToast({
        title: 'Error!',
        description: 'Input is not Base64 encoded string!',
        type: 'error',
      });
    }
  }

  const pasteData = async () => {
    try {
      if ('clipboard' in navigator) {
        const text = await navigator.clipboard.readText();
        setInput(text);
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

  const clear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <>
      <div className="toolbox">
        <div className="menus">
          <div className="menu" role="button" onClick={() => pasteData()}>
            Paste
          </div>
          <div
            className={`menu ${output.length === 0 && 'disabled'}`}
            role="button"
            onClick={() => handleCopyClick()}
          >
            Copy Result
          </div>
          <div
            className={`menu ${input.length === 0 && 'disabled'}`}
            role="button"
            onClick={() => clear()}
          >
            Clear
          </div>
          <div className="divider"></div>
          <div className={style.menuInput}>
            <label htmlFor="autoInput">
              <input
                type="checkbox"
                id="autoInput"
                checked={auto}
                onChange={(e) => handleLiveModeChange(e.target.checked)}
              />
              <span>Live Mode</span>
            </label>
          </div>
          <div className={style.menuInput}>
            <label htmlFor="lineWiseInput">
              <input
                type="checkbox"
                id="lineWiseInput"
                checked={lineWise}
                onChange={(e) => handleLineWiseChange(e.target.checked)}
              />
              <span>Decode line-wise</span>
            </label>
          </div>
        </div>
        <div className="menus">
          <div className="menu" role="button" onClick={() => onModalShow(true)}>
            About
          </div>
        </div>
      </div>
      <div className={style.multi_textarea}>
        <textarea
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          spellCheck="false"
          className={`multi ${inputInvalid && 'invalid'}`}
          placeholder="Type (or Paste) here"
        ></textarea>
        {!auto && (
          <button
            className={style.actBtn}
            type="button"
            onClick={() => doDecoding()}
          >
            Decode
          </button>
        )}
        <textarea
          value={output}
          className="multi"
          readOnly
          placeholder="Result goes here..."
        ></textarea>
      </div>
    </>
  );
};

export default Base64Decoder;
