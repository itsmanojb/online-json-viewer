import { useContext } from "react";
import { ObjectConverterContext } from "../contexts/ObjectConverterContext";

const useObjectConverter = () => {
  const context = useContext(ObjectConverterContext);

  if (context === undefined) {
    throw new Error(
      "useObjectConverter must be used within ObjectConverterContext"
    );
  }

  return context;
};

export default useObjectConverter;
