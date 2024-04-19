import { useReducer, createContext } from "react";
import Reducer, { initialState } from "../reducers/JsonDiffReducer";

export const JsonDiffContext = createContext(initialState);
export const JsonDiffProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const setInputJson1 = (val) => {
    dispatch({
      type: "SET_JSON_INPUT1",
      payload: val,
    });
  };

  const setInputJson2 = (val) => {
    dispatch({
      type: "SET_JSON_INPUT2",
      payload: val,
    });
  };

  const beautify = (input, val) => {
    dispatch({
      type: input === "json1" ? "BEAUTIFY_JSON_INPUT1" : "BEAUTIFY_JSON_INPUT2",
      payload: val,
    });
  };

  const compareJson = () => {
    dispatch({
      type: "COMPARE",
    });
  };

  const setConfig = (values) => {
    dispatch({
      type: "SET_CONFIG",
      payload: values,
    });
  };

  const resetDiff = () => {
    dispatch({
      type: "RESET_DIFF",
    });
  };

  const data = {
    ...state,
    setInputJson1,
    setInputJson2,
    beautify,
    compareJson,
    setConfig,
    resetDiff,
  };

  return (
    <JsonDiffContext.Provider value={data}>{children}</JsonDiffContext.Provider>
  );
};
