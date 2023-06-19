import React from "react";
import { classNames } from "../../Util";
import useAppContext from "../../AppContext";
import { toast } from "react-hot-toast";

export default function InputJSON() {
  const {
    indent,
    jsonInput,
    invalidInput,
    setInputJson,
    setOutputJson,
    showRemoteURLModal,
  } = useAppContext();

  const pasteData = async () => {
    try {
      if ("clipboard" in navigator) {
        const text = await navigator.clipboard.readText();
        setInputJson(text);
      } else {
        document.execCommand("paste");
      }
    } catch (error) {
      toast.error("Clipboard access required to perform this task.");
      console.log("error", error);
    }
  };

  const handleInputChange = (value) => {
    setInputJson(value);
  };

  const parseJson = () => {
    const formatted = JSON.stringify(JSON.parse(jsonInput), null, +indent);
    setOutputJson(formatted);
  };

  const clearJson = () => {
    setInputJson("");
    setOutputJson("");
  };

  return (
    <>
      <div className="bg-neutral-100 sticky top-0 border-b border-neutral-200">
        <div className="flex items-center divide-x divide-neutral-300">
          {jsonInput && !invalidInput && (
            <button
              type="button"
              onClick={() => parseJson()}
              className="flex items-center gap-1 text-sm py-2 px-4 _btn"
              title="Convert JSON"
            >
              <span>Convert</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => pasteData()}
            className="flex items-center gap-1 text-sm py-2 px-4 _btn"
            title="Paste from Clipboard"
          >
            <span>Paste</span>
          </button>
          <button
            type="button"
            onClick={() => showRemoteURLModal()}
            className="flex items-center justify-center gap-1 text-sm py-2 px-4 flex-1 _btn"
            disabled={jsonInput}
          >
            <span>Load Remote Data</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1 text-sm py-2 px-4 _btn"
            onClick={() => clearJson()}
            title="Clear Input"
            disabled={!jsonInput}
          >
            <span>Clear</span>
          </button>
        </div>
      </div>
      <textarea
        value={jsonInput}
        onChange={(e) => handleInputChange(e.target.value)}
        spellCheck="false"
        className={classNames(
          "ml-0.5 my-0.5 border-0 p-2 focus:outline-none resize-none font-mono text-xs",
          invalidInput
            ? "focus:ring-2 ring-2 ring-red-400 focus:ring-red-400"
            : "focus:ring-0"
        )}
        style={{
          width: "calc(100% - 4px)",
          height: "calc(100% - 6px)",
        }}
        placeholder="Type (or Paste) here"
      ></textarea>
    </>
  );
}
