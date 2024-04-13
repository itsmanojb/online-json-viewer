import { useState } from "react";
import ReactJson from "react-json-view";
import useJsonViewer from "../hooks/useJsonViewer";

const TreeView = ({ jsonInput }) => {
  const initial = {
    stringLength: 50,
    arrLength: 20,
    theme: "ocean",
  };

  const { indent } = useJsonViewer();

  const [showSize, setShowSize] = useState(true);
  const [showType, setShowType] = useState(true);
  const [arrayGroup, setArrayGroup] = useState(true);
  const [arrayGroupLength, setArrayGroupLength] = useState(initial.arrLength);
  const [truncateAfter, setTruncateAfter] = useState(initial.stringLength);

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

  return (
    <div className="flex flex-col h-full">
      <div className="flex divide-x divide-[#4f5b66] border-b border-[#4f5b66]">
        <div className="flex-1 pl-3 pr-1 py-2">
          <label
            htmlFor="objSizeInput"
            className="flex items-center gap-2 text-neutral-500 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="obj-size"
              id="objSizeInput"
              checked={showSize}
              onChange={(e) => setShowSize(e.target.checked)}
              className="h-4 w-4 rounded bg-[#4f5b66] border-0 text-yellow-600 focus:ring-0"
            />
            <span>Object Size</span>
          </label>
        </div>
        <div className="flex-1 pl-3 pr-1 py-2">
          <label
            htmlFor="objTypeInput"
            className="flex items-center gap-2 text-neutral-500 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="obj-type"
              id="objTypeInput"
              checked={showType}
              onChange={(e) => setShowType(e.target.checked)}
              className="h-4 w-4 rounded bg-[#4f5b66] border-0 text-yellow-600 focus:ring-0"
            />
            <span>Object Type</span>
          </label>
        </div>
        <div className="flex-1 pl-3 pr-1 py-2">
          <label
            htmlFor="arrGroupInput"
            className="flex items-center gap-2 text-neutral-500 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="obj-type"
              id="arrGroupInput"
              checked={arrayGroup}
              onChange={(e) => toggleArrayGrouping(!e.target.checked)}
              className="h-4 w-4 rounded bg-[#4f5b66] border-0 text-yellow-600 focus:ring-0"
            />
            <span>Array Grouping</span>
          </label>
        </div>
        <div className="flex-1 pl-3 pr-1 py-2">
          <label
            htmlFor="strTruncInput"
            className="flex items-center gap-2 text-neutral-500 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="obj-type"
              id="strTruncInput"
              checked={truncateAfter}
              onChange={(e) => toggleStringTruncate(!e.target.checked)}
              className="h-4 w-4 rounded bg-[#4f5b66] border-0 text-yellow-600 focus:ring-0"
            />
            <span>Truncate Strings</span>
          </label>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-2">
        {jsonInput && (
          <ReactJson
            src={JSON.parse(jsonInput)}
            iconStyle="square"
            enableClipboard={true}
            displayObjectSize={showSize}
            displayDataTypes={showType}
            groupArraysAfterLength={arrayGroupLength}
            collapseStringsAfterLength={truncateAfter}
            indentWidth={indent}
            theme={initial.theme}
          />
        )}
      </div>
    </div>
  );
};

export default TreeView;
