import React from "react";

export default function JSONTools({
  inputJson,
  onCopy,
  onPaste,
  onBeautify,
  onClear,
  onRemote,
}) {
  return (
    <div className="flex items-center divide-x divide-neutral-300 dark:divide-gray-600">
      <button
        type="button"
        onClick={() => onCopy()}
        className="flex items-center gap-1 text-xs py-2 px-4 _btn"
        title="Copy to Clipboard"
        disabled={!inputJson}>
        <span>Copy</span>
      </button>
      <button
        type="button"
        onClick={() => onPaste()}
        className="flex items-center gap-1 text-xs py-2 px-4 _btn"
        title="Paste from Clipboard">
        <span>Paste</span>
      </button>
      <button
        type="button"
        onClick={() => onRemote()}
        className="flex flex-1 justify-center items-center gap-1 text-xs py-2 px-4 _btn"
        disabled={inputJson}>
        <span>
          Load <span className="hidden lg:inline">Remote</span> Data
        </span>
      </button>
      <button
        type="button"
        className="flex items-center gap-1 text-xs py-2 px-4 _btn"
        onClick={() => onBeautify()}
        title="Beautify JSON input"
        disabled={!inputJson}>
        <span>Beautify</span>
      </button>
      <button
        type="button"
        className="flex items-center gap-1 text-xs py-2 px-4 _btn"
        onClick={() => onClear()}
        title="Clear Input"
        disabled={!inputJson}>
        <span>Clear</span>
      </button>
    </div>
  );
}
