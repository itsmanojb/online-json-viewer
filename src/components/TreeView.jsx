import { useState } from 'react';
import ReactJson from 'react-json-view';
import style from './components.module.css';

const TreeView = ({ jsonInput, showModal }) => {
  const initial = {
    stringLength: 100,
    arrLength: 25,
    theme: 'shapeshifter:inverted',
    dark: false,
  };

  const [showSize, setShowSize] = useState(true);
  const [showType, setShowType] = useState(true);
  const [arrayGroup, setArrayGroup] = useState(true);
  const [arrayGroupLength, setArrayGroupLength] = useState(initial.arrLength);
  const [truncateAfter, setTruncateAfter] = useState(initial.stringLength);
  const [dark, setDark] = useState(initial.dark);
  const [theme, setTheme] = useState(initial.stringLength);

  function toggleArrayGrouping(enable) {
    if (!enable) {
      setArrayGroup(true);
      setArrayGroupLength(initial.arrLength);
    } else {
      setArrayGroup(false);
      setArrayGroupLength(0);
    }
  }

  function toggleStringTruncate(enable) {
    if (!enable) {
      setTruncateAfter(initial.stringLength);
    } else {
      setTruncateAfter(false);
    }
  }

  function toggleDarkMode(enable) {
    if (!enable) {
      setDark(true);
      setTheme('monokai');
    } else {
      setDark(false);
      setTheme(initial.theme);
    }
  }

  return (
    <section>
      <div className="toolbox">
        <div className="menus">
          <div className={style.menuInput}>
            <label htmlFor="themeInput">
              <input
                type="checkbox"
                name="obj-type"
                id="themeInput"
                checked={dark}
                onChange={(e) => toggleDarkMode(!e.target.checked)}
              />
              <span>Dark Mode</span>
            </label>
          </div>
          <div className="divider"></div>
          <div className={style.menuInput}>
            <label htmlFor="objSizeInput">
              <input
                type="checkbox"
                name="obj-size"
                id="objSizeInput"
                checked={showSize}
                onChange={(e) => setShowSize(e.target.checked)}
              />
              <span>Object Size</span>
            </label>
          </div>
          <div className={style.menuInput}>
            <label htmlFor="objTypeInput">
              <input
                type="checkbox"
                name="obj-type"
                id="objTypeInput"
                checked={showType}
                onChange={(e) => setShowType(e.target.checked)}
              />
              <span>Object Type</span>
            </label>
          </div>
          <div className="divider"></div>
          <div className={style.menuInput}>
            <label htmlFor="arrGroupInput">
              <input
                type="checkbox"
                name="obj-type"
                id="arrGroupInput"
                checked={arrayGroup}
                onChange={(e) => toggleArrayGrouping(!e.target.checked)}
              />
              <span>Array Grouping</span>
            </label>
          </div>
          <div className={style.menuInput}>
            <label htmlFor="strTruncInput">
              <input
                type="checkbox"
                name="obj-type"
                id="strTruncInput"
                checked={truncateAfter}
                onChange={(e) => toggleStringTruncate(!e.target.checked)}
              />
              <span>Truncate Strings</span>
            </label>
          </div>
        </div>
        <div className="menus">
          <div className="menu" role="button" onClick={() => showModal(true)}>
            About
          </div>
        </div>
      </div>
      <div className={`wrapper ${dark && 'dark'}`}>
        <ReactJson
          src={JSON.parse(jsonInput)}
          iconStyle="square"
          enableClipboard={false}
          displayObjectSize={showSize}
          displayDataTypes={showType}
          groupArraysAfterLength={arrayGroupLength}
          collapseStringsAfterLength={truncateAfter}
          theme={theme}
        />
      </div>
    </section>
  );
};

export default TreeView;
