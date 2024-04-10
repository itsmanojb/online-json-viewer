import { useContext } from "react";
import { JsonViewerContext } from "../contexts/JsonViewerContext";

const useJsonViewer = () => {
  const context = useContext(JsonViewerContext);

  if (context === undefined) {
    throw new Error("useJsonViewer must be used within JsonViewerContext");
  }

  return context;
};

export default useJsonViewer;
