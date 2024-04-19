import React from "react";
import { toast } from "react-hot-toast";
import { classNames, copyContent } from "../../utils/helper";
import useAppContext from "../../hooks/useAppContext";
import useJsonDiff from "../../hooks/useJsonDiff";
import JSONTools from "./JSONTools";

export default function InputJSON1() {
  const { showModal } = useAppContext();
  const {
    jsonInput1,
    jsonFormattedInput1,
    invalidInput1,
    setInputJson1,
    beautify,
  } = useJsonDiff();

  const pasteData = async () => {
    try {
      if ("clipboard" in navigator) {
        const text = await navigator.clipboard.readText();
        setInputJson1(text);
      } else {
        document.execCommand("paste");
      }
    } catch (error) {
      toast.error("Clipboard access required to perform this task.");
      console.log("error", error);
    }
  };

  const handleInputChange = (value) => {
    setInputJson1(value);
  };

  const copyJson = () => copyContent(jsonInput1);
  const beautifyJson = () => {
    const formatted = JSON.stringify(JSON.parse(jsonInput1), null, 2);
    beautify("json1", formatted);
  };

  const clearJson = () => {
    setInputJson1("");
  };

  return (
    <>
      <div className="bg-neutral-100 sticky top-0 border-b border-neutral-200 dark:bg-gray-700 dark:border-gray-600">
        <JSONTools
          inputJson={jsonInput1}
          onCopy={() => copyJson()}
          onPaste={() => pasteData()}
          onBeautify={() => beautifyJson()}
          onClear={() => clearJson()}
          onRemote={() => showModal("remote1")}
        />
      </div>
      <textarea
        value={jsonFormattedInput1}
        onChange={(e) => handleInputChange(e.target.value)}
        spellCheck="false"
        className={classNames(
          "ml-0.5 my-0.5 border-0 p-2 focus:outline-none resize-none font-mono text-xs bg-transparent dark:text-gray-300 scroller",
          invalidInput1
            ? "focus:ring-2 ring-2 ring-red-400 focus:ring-red-400"
            : "focus:ring-0"
        )}
        style={{
          width: "calc(100% - 4px)",
          height: "calc(100% - 2px)",
        }}
        placeholder="Type (or Paste) here"></textarea>
    </>
  );
}
