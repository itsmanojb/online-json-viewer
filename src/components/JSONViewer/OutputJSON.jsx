import React from "react";
import { toast } from "react-hot-toast";
import { classNames } from "../../Util";
import useAppContext from "../../AppContext";
import TreeView from "./TreeView";

export default function OutputJSON() {
  const {
    jsonInput,
    jsonOutput,
    invalidInput,
    treeView,
    indent,
    setIndentation,
    toggleTreeView,
    setOutputJson,
  } = useAppContext();

  const handleCopyClick = () => {
    copyTextToClipboard(jsonInput)
      .then(() => {
        toast.success("Copied to clipboard.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const formatJSON = () => {
    if (invalidInput) {
      toast.error("Provided JSON is invalid.");
      return;
    }
    const formatted = JSON.stringify(JSON.parse(jsonInput), null, +indent);
    setOutputJson(formatted);
  };

  const handleIndentChange = (val) => {
    setIndentation(val);
    const formatted = JSON.stringify(JSON.parse(jsonInput), null, +val);
    setOutputJson(formatted);
  };

  return (
    <>
      <div className="bg-neutral-100 border-b border-neutral-200">
        <div className="flex items-center divide-x divide-neutral-300">
          <div className="flex gap-0.5 px-1">
            <input
              type="number"
              placeholder="Indent"
              step={2}
              min={0}
              max={16}
              value={indent}
              className="input p-0 text-center min-w-[120px] pr-1"
              onChange={(e) => handleIndentChange(e.target.value)}
              disabled={invalidInput || !jsonInput}
            />
            <button
              type="button"
              className="btn-primary px-3 py-1"
              onClick={() => formatJSON()}
              title="Format JSON"
              disabled={invalidInput || !jsonInput}
            >
              <span>Convert</span>
            </button>
          </div>
          <button
            type="button"
            onClick={() => toggleTreeView()}
            title="Toggle Treeview"
            disabled={invalidInput || !jsonInput}
            className="flex items-center gap-2 text-sm py-2 px-4 ml-auto _btn"
          >
            <span>{treeView ? "Raw JSON" : "Pretty JSON"}</span>
          </button>
          {!treeView && (
            <button
              type="button"
              onClick={() => handleCopyClick()}
              title="Copy to Clipboard"
              disabled={invalidInput || !jsonInput}
              className="flex items-center gap-1 text-sm py-2 px-4 _btn"
            >
              <span>Copy</span>
            </button>
          )}
        </div>
      </div>
      <div className="bg-[#2b303b] h-full">
        {invalidInput && (
          <div className="p-2 text-orange-600">Invalid JSON</div>
        )}
        {treeView ? (
          <TreeView jsonInput={jsonOutput} />
        ) : (
          <textarea
            value={jsonOutput}
            spellCheck="false"
            className={classNames(
              "w-full h-full border-0 p-2 focus:outline-none focus:ring-0 resize-none font-mono text-xs cursor-text",
              "bg-[#2b303b] text-white"
            )}
            readOnly
          ></textarea>
        )}
      </div>
    </>
  );
}
