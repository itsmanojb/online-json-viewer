import React from "react";
import { toast } from "react-hot-toast";
import { classNames } from "../../utils/helper";
import useObjectConverter from "../../hooks/useObjectConverter";
import TreeView from "./TreeView";

export default function OutputJSON() {
  const {
    objectInput,
    setInputObject,
    jsonOutput,
    invalidInput,
    treeView,
    indent,
    setIndentation,
    toggleTreeView,
    setOutputJson,
  } = useObjectConverter();

  const handleCopyClick = () => {
    copyTextToClipboard(jsonOutput)
      .then(() => {
        toast.success("JSON copied to clipboard.");
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

  const reset = () => {
    setOutputJson("");
    setInputObject("");
  };

  const handleIndentChange = (val) => {
    setIndentation(val);
    const formatted = JSON.stringify(JSON.parse(jsonOutput), null, +val);
    setOutputJson(formatted);
  };

  const downloadJSON = () => {
    const fileName = "JSON-" + new Date().getTime();
    const blob = new Blob([jsonOutput], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  return (
    <>
      <div className="bg-neutral-100 border-b border-neutral-200 dark:bg-gray-700 dark:border-gray-600">
        <div className="flex items-center divide-x divide-neutral-300 px-2 dark:divide-gray-600">
          <div className="flex items-center gap-2 pl-l pr-4">
            <span className="text-gray-700 text-sm dark:text-gray-300">
              Indentation
            </span>
            <input
              type="number"
              placeholder="Indent"
              step={2}
              min={0}
              max={10}
              value={indent}
              className="input py-0.5 text-center w-[80px] pr-1 dark:bg-gray-600 dark:shadow-none dark:ring-transparent dark:text-gray-300"
              onChange={(e) => handleIndentChange(e.target.value)}
              disabled={invalidInput || !objectInput}
            />
          </div>
          <button
            type="button"
            onClick={() => toggleTreeView()}
            title={treeView ? "Switch to Raw JSON" : "Switch to Parsed JSON"}
            disabled={invalidInput || !objectInput}
            className="flex items-center gap-2 text-sm py-2 px-3 md:px-6 md:ml-0 ml-auto _btn">
            <span className="hidden sm:inline">
              {treeView ? "Raw JSON" : "Parsed JSON"}
            </span>
            <span className="inline sm:hidden">
              {treeView ? "Raw" : "Parsed"}
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleCopyClick()}
            title="Copy to Clipboard"
            disabled={invalidInput || !objectInput || treeView}
            className="flex items-center gap-1 text-sm md:ml-auto py-2 px-3 md:px-6 _btn">
            <span>Copy</span>
          </button>
          <button
            type="button"
            onClick={() => downloadJSON()}
            title="Download JSON File"
            disabled={invalidInput || !objectInput || treeView}
            className="flex items-center gap-1 text-sm py-2 px-3 md:px-6 _btn">
            <span>Download</span>
          </button>
          <button
            type="button"
            className={`btn-primary px-3 py-1 w-20 md:w-40`}
            onClick={() => reset()}
            title="Clear JSON and Reset"
            disabled={invalidInput || !objectInput}>
            <span>
              Clear <span className="hidden md:inline">JSON</span>
            </span>
          </button>
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
            readOnly></textarea>
        )}
      </div>
    </>
  );
}
