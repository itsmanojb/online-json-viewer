import { isInvalidJSON } from "../utils/helper";

export const initialState = {
  jsonInput: undefined,
  invalidInput: false,
  jsonOutput: undefined,
  treeView: false,
  indent: 2,
};

const JsonViewerReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_JSON_INPUT":
      return {
        ...state,
        jsonInput: payload,
        invalidInput: payload ? isInvalidJSON(payload) : false,
      };
    case "SET_JSON_OUTPUT":
      return {
        ...state,
        jsonOutput: payload,
      };
    case "TOGGLE_TREE_VIEW":
      return {
        ...state,
        treeView: !state.treeView,
      };
    case "SET_INDENT":
      return {
        ...state,
        indent: payload,
      };
    default:
      return { ...state };
  }
};

export default JsonViewerReducer;
