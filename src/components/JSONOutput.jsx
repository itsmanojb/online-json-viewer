import { classNames } from "../utils/helper";
import TreeView from "./TreeView";

export default function JSONOutput(props) {
  const { isInvalid, treeView, data } = props;
  return (
    <div className="bg-[#2b303b] h-full">
      {isInvalid && <div className="p-2 text-orange-600">Invalid JSON</div>}
      {treeView ? (
        <TreeView jsonInput={data} />
      ) : (
        <textarea
          value={data}
          spellCheck="false"
          className={classNames(
            "w-full h-full border-0 p-2 focus:outline-none focus:ring-0 resize-none font-mono text-xs cursor-text",
            "bg-[#2b303b] text-white",
            "scroller"
          )}
          readOnly></textarea>
      )}
    </div>
  );
}
