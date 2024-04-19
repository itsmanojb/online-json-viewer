import json5 from "json5";
import { Differ } from "json-diff-kit";
import { isInvalidJSON } from "../utils/helper";

export const initialState = {
  jsonInput1: undefined,
  jsonFormattedInput1: undefined,
  invalidInput1: false,
  objectInput1: undefined,
  jsonInput2: undefined,
  jsonFormattedInput2: undefined,
  invalidInput2: false,
  objectInput2: undefined,
  diff: undefined,

  differConfig: {
    detectCircular: true,
    maxDepth: null,
    showModifications: true,
    arrayDiffMethod: "lcs", // 'normal', 'unorder-normal', 'unorder-lcs'
    ignoreCase: false,
    ignoreCaseForKey: false,
    recursiveEqual: true,
    preserveKeyOrder: "before", // 'after'
  },

  viewerConfig: {
    indent: 2,
    lineNumbers: true,
    hideUnchangedLines: true,
    highlightInlineDiff: true,
  },
};

const JsonDiffReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_JSON_INPUT1":
      return {
        ...state,
        jsonInput1: payload,
        jsonFormattedInput1: payload,
        invalidInput1: payload ? isInvalidJSON(payload) : false,
        objectInput1: isInvalidJSON(payload) ? undefined : json5.parse(payload),
      };
    case "SET_JSON_INPUT2":
      return {
        ...state,
        jsonInput2: payload,
        jsonFormattedInput2: payload,
        invalidInput2: payload ? isInvalidJSON(payload) : false,
        objectInput2: isInvalidJSON(payload) ? undefined : json5.parse(payload),
      };
    case "BEAUTIFY_JSON_INPUT1":
      return {
        ...state,
        jsonFormattedInput1: payload,
      };
    case "BEAUTIFY_JSON_INPUT2":
      return {
        ...state,
        jsonFormattedInput2: payload,
      };
    case "COMPARE": {
      let diff = null;
      const { objectInput1, objectInput2, differConfig } = state;
      if (objectInput1 && objectInput2) {
        const differ = new Differ({ ...differConfig });
        diff = differ.diff(objectInput1, objectInput2);
      }
      return {
        ...state,
        diff,
      };
    }
    case "SET_CONFIG": {
      let diff = null;
      const { objectInput1, objectInput2 } = state;
      if (objectInput1 && objectInput2) {
        const differ = new Differ({ ...payload.differConfig });
        diff = differ.diff(objectInput1, objectInput2);
      }
      return {
        ...state,
        differConfig: payload.differConfig,
        viewerConfig: payload.viewerConfig,
        diff,
      };
    }
    case "RESET_DIFF":
      return {
        ...state,
        diff: undefined,
      };
    default:
      return { ...state };
  }
};

export default JsonDiffReducer;
