import { isInvalidObject, modifyJSON } from "../utils/helper";

export const initialState = {
  objectInput: undefined,
  invalidInput: false,
  jsonOutput: undefined,
  treeView: false,
  modifiedJson: undefined,
  sortOrder: undefined,
  excludedProps: [],
  indent: 2,
};

const ObjectConverterReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_OBJECT_INPUT":
      return {
        ...state,
        sortOrder: undefined,
        objectInput: payload,
        invalidInput: payload ? isInvalidObject(payload) : false,
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
        sortBy: undefined,
        sortOrder: undefined,
        modifiedJson: state.jsonOutput,
      };
    case "EXCLUDE_PROP":
      return {
        ...state,
        excludedProps: payload,
        modifiedJson: modifyJSON(
          state.modifiedJson,
          "exclude",
          payload,
          state.indent
        ),
      };
    default:
      return { ...state };
  }
};

export default ObjectConverterReducer;
