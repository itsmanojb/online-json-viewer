import json5 from "json5";
import { toast } from "react-hot-toast";

function isInvalidJSON(value) {
  if (value) {
    try {
      JSON.parse(value);
      return false;
    } catch (e) {
      return true;
    }
  }
  return true;
}

function isInvalidObject(value) {
  if (value) {
    try {
      json5.parse(value);
      return false;
    } catch (e) {
      return true;
    }
  }
  return true;
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function checkUrl(url) {
  if (!url) return;
  const expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const regex = new RegExp(expression);

  return url.match(regex) ? false : true;
}

function copyContent(text) {
  copyTextToClipboard(text)
    .then(() => {
      toast.success("JSON copied to clipboard.");
    })
    .catch((err) => {
      console.log(err);
    });
}

async function copyTextToClipboard(text) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
}

function downloadAsJSON(json) {
  const fileName = "JSON-" + new Date().getTime();
  const blob = new Blob([json], { type: "application/json" });
  const href = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = href;
  link.download = fileName + ".json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
}

function modifyJSON(jsonStr, action, payload, indent) {
  const json = JSON.parse(jsonStr);
  let modifiedJson;
  if (Array.isArray(json)) {
    modifiedJson = json.map((obj) => {
      if (action === "sort") {
        return sortObject(obj, payload);
      }
      if (action === "exclude") {
        return excludeKeysFromObject(obj, payload);
      }
      return obj;
    });
  } else if (typeof json === "object") {
    const obj = json;
    if (action === "sort") {
      modifiedJson = sortObject(obj, payload);
    }
    if (action === "exclude") {
      modifiedJson = excludeKeysFromObject(obj, payload);
    }
    modifiedJson = obj;
  }

  return JSON.stringify(modifiedJson, null, indent);
}

function getObjectProps(jsonString) {
  const obj = JSON.parse(jsonString);
  let props = [];
  if (Array.isArray(obj)) {
    const keyLengths = obj.map((o) => Object.keys(o).length);
    const largestObjectIndex = keyLengths.reduce(
      (maxIndex, currentValue, currentIndex, array) =>
        currentValue > array[maxIndex] ? currentIndex : maxIndex,
      0
    );
    props = Object.keys(obj[largestObjectIndex]);
  } else if (typeof json === "object") {
    props = Object.keys(obj);
  }

  return props;
}

function sortObject(obj, sortOrder) {
  return Object.keys(obj)
    .sort((a, b) => {
      if (sortOrder === "desc") {
        return a > b ? -1 : 1;
      }
      if (sortOrder === "asc") {
        return a > b ? 1 : -1;
      }
      return 1;
    })
    .reduce((o, key) => {
      o[key] = obj[key];
      return o;
    }, {});
}

function excludeKeysFromObject(obj, keys) {
  return keys.reduce((a, e) => {
    const { [e]: omit, ...rest } = a;
    return rest;
  }, obj);
}

export {
  classNames,
  isInvalidJSON,
  isInvalidObject,
  checkUrl,
  copyContent,
  getObjectProps,
  modifyJSON,
  downloadAsJSON,
};
