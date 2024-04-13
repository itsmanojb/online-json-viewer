import { copyContent, downloadAsJSON } from "../../utils/helper";
import useJsonViewer from "../../hooks/useJsonViewer";
import useAppContext from "../../hooks/useAppContext";
import JSONToolbar from "../../components/JSONToolbar";
import JSONOutput from "../../components/JSONOutput";

export default function OutputJSON() {
  const { showModal } = useAppContext();
  const {
    jsonInput,
    setInputJson,
    jsonOutput,
    modifiedJson,
    invalidInput,
    treeView,
    indent,
    setIndentation,
    toggleTreeView,
    setOutputJson,
  } = useJsonViewer();

  const reset = () => {
    setOutputJson("");
    setInputJson("");
  };

  const handleIndentChange = (val) => {
    setIndentation(val);
    const formatted = JSON.stringify(JSON.parse(jsonInput), null, +val);
    setOutputJson(formatted);
  };

  const toolbarProps = {
    indentation: {
      indentation: indent,
      onIndentationChange: (val) => handleIndentChange(val),
      indentationDisabled: invalidInput || !jsonInput,
    },
    treeview: {
      treeView,
      onToggleClick: () => toggleTreeView(),
      viewToggleDisabled: invalidInput || !jsonInput,
    },
    modify: {
      onModifyClick: () => showModal("jsonmodify"),
      modifyDisabled: invalidInput || !jsonInput || treeView,
    },
    copy: {
      onCopyClick: () => copyContent(jsonOutput),
      copyDisabled: invalidInput || !jsonInput || treeView,
    },
    download: {
      onDownloadClick: () => downloadAsJSON(jsonOutput),
      downloadDisabled: invalidInput || !jsonInput || treeView,
    },
    clear: {
      onClear: () => reset(),
      clearDisabled: invalidInput || !jsonInput,
    },
  };

  return (
    <>
      <div className="bg-neutral-100 border-b border-neutral-200 dark:bg-gray-700 dark:border-gray-600">
        <JSONToolbar {...toolbarProps} />
      </div>
      <JSONOutput
        isInvalid={invalidInput}
        treeView={treeView}
        data={modifiedJson}
      />
    </>
  );
}
