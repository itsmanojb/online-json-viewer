export default function JSONToolbar(props) {
  const { indentation, onIndentationChange, indentationDisabled } =
    props.indentation;
  const { treeView, onToggleClick, viewToggleDisabled } = props.treeview;
  const { onModifyClick, modifyDisabled } = props.modify;
  const { onCopyClick, copyDisabled } = props.copy;
  const { onDownloadClick, downloadDisabled } = props.download;
  const { onClear, clearDisabled } = props.clear;

  return (
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
          value={indentation}
          className="input py-0.5 text-center w-[80px] pr-1 dark:bg-gray-600 dark:shadow-none dark:ring-transparent dark:text-gray-300"
          onChange={(e) => onIndentationChange(e.target.value)}
          disabled={indentationDisabled}
        />
      </div>
      <button
        type="button"
        onClick={() => onToggleClick()}
        title={treeView ? "Switch to JSON" : "Switch to Tree view"}
        disabled={viewToggleDisabled}
        className="flex items-center gap-2 text-sm py-2 px-3 md:px-6 md:ml-0 ml-auto _btn">
        <span className="hidden sm:inline">
          {treeView ? "JSON view" : "Treeview"}
        </span>
        <span className="inline sm:hidden">
          {treeView ? "Raw" : "Treeview"}
        </span>
      </button>
      <button
        type="button"
        title="Modify JSON Structure"
        onClick={() => onModifyClick()}
        disabled={modifyDisabled}
        className="flex items-center gap-1 text-sm md:ml-auto py-2 px-3 md:px-6 _btn">
        <span>
          Modify <span className="hidden sm:inline">JSON</span>
        </span>
      </button>
      <button
        type="button"
        onClick={() => onCopyClick()}
        title="Copy to Clipboard"
        disabled={copyDisabled}
        className="flex items-center gap-1 text-sm py-2 px-3 md:px-6 _btn">
        <span>Copy</span>
      </button>
      <button
        type="button"
        onClick={() => onDownloadClick()}
        title="Download JSON File"
        disabled={downloadDisabled}
        className="flex items-center gap-1 text-sm py-2 px-3 md:px-6 _btn">
        <span>Download</span>
      </button>
      <button
        type="button"
        className={`btn-primary px-3 py-1 w-20 md:w-40`}
        onClick={() => onClear()}
        title="Clear JSON and Reset"
        disabled={clearDisabled}>
        <span>
          Clear <span className="hidden md:inline">JSON</span>
        </span>
      </button>
    </div>
  );
}
