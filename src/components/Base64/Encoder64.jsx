import { useState } from 'react';
import useToastContext from '../Toast/useToastContext';
import style from './base64.module.css';

const Base64Encoder = ({ onModalShow }) => {
  const addToast = useToastContext();

  const [input, setInput] = useState('');
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
    if (auto) {
      if (lineWise) {
        const raw = e.split('\n');
        const joined = raw.map((line) => btoa(line)).join('\n');
        setOutput(joined);
      } else {
        doEncoding();
      }
    }
  };

  const handleLiveModeChange = (e) => {
    setAuto(e);
    if (e) {
      if (lineWise) {
        const raw = input.split('\n');
        const joined = raw.map((line) => btoa(line)).join('\n');
        setOutput(joined);
      } else {
        doEncoding();
      }
    }
  };

  const handleLineWiseChange = (e) => {
    setLineWise(e);
    if (e) {
      const raw = input.split('\n');
      const joined = raw.map((line) => btoa(line)).join('\n');
      if (auto) {
        setOutput(joined);
      }
    } else {
      const joined = btoa(input);
      if (auto) {
        setOutput(joined);
      }
    }
  };

  function doEncoding() {
    let encoded;
    if (lineWise) {
      const raw = input.split('\n');
      const joined = raw.map((line) => btoa(line)).join('\n');
      encoded = joined;
    } else {
      encoded = btoa(input);
    }
    setOutput(encoded);
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
              <span>Encode line-wise</span>
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
          className="multi"
          placeholder="Type (or Paste) here"
        ></textarea>
        {!auto && (
          <button
            className={style.actBtn}
            type="button"
            onClick={() => doEncoding()}
          >
            Encode
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

export default Base64Encoder;
