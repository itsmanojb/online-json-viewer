import { isInvalidJSON, modifyJSON } from "../utils/helper";

export const initialState = {
  jsonInput: undefined,
  invalidInput: false,
  jsonOutput: undefined,
  treeView: false,
  modifiedJson: undefined,
  sortOrder: undefined,
  excludedProps: [],
  indent: 2,
};

const JsonViewerReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_JSON_INPUT":
      return {
        ...state,
        sortOrder: undefined,
        jsonInput: payload,
        invalidInput: payload ? isInvalidJSON(payload) : false,
      };
    case "SET_JSON_OUTPUT":
      return {
        ...state,
        sortOrder: undefined,
        jsonOutput: payload,
        modifiedJson: payload,
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
    case "SET_SORT_PARAM":
      return {
        ...state,
        sortOrder: undefined,
      };
    case "SET_SORT_ORDER":
      return {
        ...state,
        sortOrder: payload,
        modifiedJson: modifyJSON(
          state.modifiedJson,
          "sort",
          payload,
          state.indent
        ),
      };
    case "RESET_SORTING":
      return {
        ...state,
        sortOrder: undefined,
        modifiedJson: state.jsonOutput,
      };
    case "EXCLUDE_PROP":
      return {
        ...state,
        excludedProps: payload,
        modifiedJson: modifyJSON(
          state.jsonOutput,
          "exclude",
          payload,
          state.indent
        ),
      };
    default:
      return { ...state };
  }
};

export default JsonViewerReducer;
