import { useContext } from "react";
import { JsonDiffContext } from "../contexts/JsonDiffContext";

const useJsonDiff = () => {
  const context = useContext(JsonDiffContext);

  if (context === undefined) {
    throw new Error("useJsonDiff must be used within JsonDiffContext");
  }

  return context;
};

export default useJsonDiff;
