import { useEffect } from "react";
import useJsonViewer from "../../hooks/useJsonViewer";
import InputJSON from "./InputJSON";
import OutputJSON from "./OutputJSON";

const Viewer = () => {
  useEffect(() => {
    document.title = "JSON Viewer";
  }, []);

  const { jsonOutput } = useJsonViewer();

  return (
    <div
      className="flex flex-col lg:flex-row overflow-hidden divide-y lg:divide-y-0 lg:divide-x dark:bg-[#2b303b]"
      style={{ height: "calc(100vh - 39px)" }}>
      {!jsonOutput ? (
        <div className="flex-1 relative pb-9">
          <InputJSON />
        </div>
      ) : (
        <div className="flex-1 relative pb-9 min-h-[60vh] md:min-h-0">
          <OutputJSON />
        </div>
      )}
    </div>
  );
};

export default Viewer;
