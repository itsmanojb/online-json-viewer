import React, { useState } from "react";
import useJsonDiff from "../../hooks/useJsonDiff";
import useAppContext from "../../hooks/useAppContext";

export default function DiffConfigModal() {
  const { hideModal } = useAppContext();

  const {
    differConfig: {
      maxDepth,
      arrayDiffMethod,
      showModifications,
      ignoreCase,
      ignoreCaseForKey,
      recursiveEqual,
      preserveKeyOrder,
    },
    viewerConfig: {
      indent,
      hideUnchangedLines,
      highlightInlineDiff,
      lineNumbers,
    },
    setConfig,
  } = useJsonDiff();

  const [_maxDepth, setMaxDepth] = useState(maxDepth);
  const [_indent, setIndent] = useState(indent);
  const [_arrayDiff, setArrayDiff] = useState(arrayDiffMethod);
  const [_preserveOrder, setPreserveKeyOrder] = useState(preserveKeyOrder);
  const [_lineNumbers, setLineNumbers] = useState(lineNumbers);
  const [_modifications, setModifications] = useState(showModifications);
  const [_ignoreCase, setIgnoreCase] = useState(ignoreCase);
  const [_ignoreKeyCase, setIgnoreKeyCase] = useState(ignoreCaseForKey);
  const [_highlightInline, setHighlightInline] = useState(highlightInlineDiff);
  const [_hideUnchanged, setHideUnchanged] = useState(hideUnchangedLines);
  const [_recursive, setRecursive] = useState(recursiveEqual);

  function saveConfig() {
    setConfig({
      differConfig: {
        maxDepth: _maxDepth,
        arrayDiffMethod: _arrayDiff,
        showModifications: _modifications,
        ignoreCase: _ignoreCase,
        ignoreCaseForKey: _ignoreKeyCase,
        recursiveEqual: _recursive,
        preserveKeyOrder: _preserveOrder,
      },
      viewerConfig: {
        indent: _indent,
        hideUnchangedLines: _hideUnchanged,
        highlightInlineDiff: _highlightInline,
        lineNumbers: _lineNumbers,
      },
    });
    hideModal();
  }

  return (
    <div className="mt-2">
      <fieldset className="border px-4 py-6 rounded border-gray-300 dark:border-gray-700 mb-4 text-neutral-600 dark:text-gray-400">
        <legend className="text-xs text-gray-400 dark:text-gray-500">
          Diff & Viewer configurations
        </legend>
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Max Depth</span>
            <div className="flex items-center gap-x-2">
              <label
                htmlFor="depthInf"
                className="flex items-center gap-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="depth"
                  id="depthInf"
                  className="checkbox rounded-sm"
                  checked={_maxDepth === null}
                  onChange={(e) => setMaxDepth(e.target.checked ? null : 1)}
                />
                <span className="text-sm">Infinity</span>
              </label>
              <input
                type="number"
                id="depthInput"
                step={1}
                min={1}
                value={_maxDepth}
                disabled={_maxDepth === null}
                className="input py-0.5 text-center w-[60px] pr-1 dark:bg-gray-600 dark:shadow-none dark:ring-transparent dark:text-gray-300"
                onChange={(e) => setMaxDepth(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="txt1" className="text-sm">
              Indent
            </label>
            <input
              type="number"
              id="txt1"
              step={2}
              min={0}
              max={10}
              value={_indent}
              className="input py-0.5 text-center w-[60px] pr-1 dark:bg-gray-600 dark:shadow-none dark:ring-transparent dark:text-gray-300"
              onChange={(e) => setIndent(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <span className="text-sm">Array diff method</span>
            <div className="flex items-center gap-x-2 pt-2">
              <label
                htmlFor="radio1"
                className="flex items-center gap-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="arrayDiff"
                  id="radio1"
                  className="radio"
                  value={"normal"}
                  checked={_arrayDiff === "normal"}
                  onChange={() => setArrayDiff("normal")}
                />
                <span className="text-sm">Normal</span>
              </label>
              <label
                htmlFor="radio2"
                className="flex items-center gap-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="arrayDiff"
                  id="radio2"
                  className="radio"
                  value={"lcs"}
                  checked={_arrayDiff === "lcs"}
                  onChange={() => setArrayDiff("lcs")}
                />
                <span className="text-sm">LCS</span>
              </label>
              <label
                htmlFor="radio3"
                className="flex items-center gap-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="arrayDiff"
                  id="radio3"
                  className="radio"
                  value={"unorder-normal"}
                  checked={_arrayDiff === "unorder-normal"}
                  onChange={() => setArrayDiff("unorder-normal")}
                />
                <span className="text-sm">Unorder Normal</span>
              </label>
              <label
                htmlFor="radio4"
                className="flex items-center gap-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="arrayDiff"
                  id="radio4"
                  className="radio"
                  value={"unorder-lcs"}
                  checked={_arrayDiff === "unorder-lcs"}
                  onChange={() => setArrayDiff("unorder-lcs")}
                />
                <span className="text-sm">Unorder LCS</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <span className="text-sm">Preserve key order</span>
            <div className="flex items-center gap-x-2 pt-2">
              <label
                htmlFor="radio5"
                className="flex items-center gap-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="order"
                  id="radio5"
                  className="radio"
                  checked={
                    _preserveOrder !== "before" && _preserveOrder !== "after"
                  }
                  onChange={() => setPreserveKeyOrder(null)}
                />
                <span className="text-sm">Sort</span>
              </label>
              <label
                htmlFor="radio6"
                className="flex items-center gap-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="order"
                  id="radio6"
                  className="radio"
                  value={"before"}
                  checked={_preserveOrder === "before"}
                  onChange={() => setPreserveKeyOrder("before")}
                />
                <span className="text-sm">By Left JSON</span>
              </label>
              <label
                htmlFor="radio7"
                className="flex items-center gap-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="order"
                  id="radio7"
                  className="radio"
                  value={"after"}
                  checked={_preserveOrder === "after"}
                  onChange={() => setPreserveKeyOrder("after")}
                />
                <span className="text-sm">By Right JSON</span>
              </label>
            </div>
          </div>
          <label
            htmlFor="cb0"
            className="flex items-center gap-x-4 cursor-pointer">
            <input
              type="checkbox"
              id="cb0"
              className="checkbox rounded-sm"
              checked={_lineNumbers}
              onChange={(e) => setLineNumbers(e.target.checked)}
            />
            <span className="text-sm">Show line numbers</span>
          </label>
          <label
            htmlFor="cb1"
            className="flex items-center gap-x-4 cursor-pointer">
            <input
              type="checkbox"
              id="cb1"
              className="checkbox rounded-sm"
              checked={_modifications}
              onChange={(e) => setModifications(e.target.checked)}
            />
            <span className="text-sm">Show modifications</span>
          </label>
          <label
            htmlFor="cb2"
            className="flex items-center gap-x-4 cursor-pointer">
            <input
              type="checkbox"
              id="cb2"
              className="checkbox rounded-sm"
              checked={_ignoreCase}
              onChange={(e) => setIgnoreCase(e.target.checked)}
            />
            <span className="text-sm">Ignore case</span>
          </label>
          <label
            htmlFor="cb3"
            className="flex items-center gap-x-4 cursor-pointer">
            <input
              type="checkbox"
              id="cb3"
              className="checkbox rounded-sm"
              checked={_ignoreKeyCase}
              onChange={(e) => setIgnoreKeyCase(e.target.checked)}
            />
            <span className="text-sm">Ignore case for key</span>
          </label>
          <label
            htmlFor="cb4"
            className="flex items-center gap-x-4 cursor-pointer">
            <input
              type="checkbox"
              id="cb4"
              className="checkbox rounded-sm"
              checked={_recursive}
              onChange={(e) => setRecursive(e.target.checked)}
            />
            <span className="text-sm">Recursive Equal</span>
          </label>
          <label
            htmlFor="cb5"
            className="flex items-center gap-x-4 cursor-pointer">
            <input
              type="checkbox"
              id="cb5"
              className="checkbox rounded-sm"
              checked={_highlightInline}
              onChange={(e) => setHighlightInline(e.target.checked)}
            />
            <span className="text-sm">Highlight inline diff</span>
          </label>
          <label
            htmlFor="cb6"
            className="flex items-center gap-x-4 cursor-pointer">
            <input
              type="checkbox"
              id="cb6"
              className="checkbox rounded-sm"
              checked={_hideUnchanged}
              onChange={(e) => setHideUnchanged(e.target.checked)}
            />
            <span className="text-sm">Hide Unchanged lines</span>
          </label>
        </div>
      </fieldset>
      <div className="px-4 py-2">
        <button
          type="submit"
          className="btn-primary px-3 py-2"
          onClick={() => saveConfig()}>
          Apply
        </button>
      </div>
    </div>
  );
}
