import { copyContent, downloadAsJSON } from "../../utils/helper";
import useObjectConverter from "../../hooks/useObjectConverter";
import JSONToolbar from "../../components/JSONToolbar";
import JSONOutput from "../../components/JSONOutput";
import useAppContext from "../../hooks/useAppContext";

export default function OutputJSON() {
  const { showModal } = useAppContext();
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

  const reset = () => {
    setOutputJson("");
    setInputObject("");
  };

  const handleIndentChange = (val) => {
    setIndentation(val);
    const formatted = JSON.stringify(JSON.parse(jsonOutput), null, +val);
    setOutputJson(formatted);
  };

  const toolbarProps = {
    indentation: {
      indentation: indent,
      onIndentationChange: (val) => handleIndentChange(val),
      indentationDisabled: invalidInput || !objectInput,
    },
    treeview: {
      treeView,
      onToggleClick: () => toggleTreeView(),
      viewToggleDisabled: invalidInput || !objectInput,
    },
    modify: {
      onModifyClick: () => showModal("jsonmodify"),
      modifyDisabled: invalidInput || !objectInput || treeView,
    },
    copy: {
      onCopyClick: () => copyContent(jsonOutput),
      copyDisabled: invalidInput || !objectInput || treeView,
    },
    download: {
      onDownloadClick: () => downloadAsJSON(jsonOutput),
      downloadDisabled: invalidInput || !objectInput || treeView,
    },
    clear: {
      onClear: () => reset(),
      clearDisabled: invalidInput || !objectInput,
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
        data={jsonOutput}
      />
    </>
  );
}
