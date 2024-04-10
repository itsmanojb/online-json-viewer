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

export {
  classNames,
  isInvalidJSON,
  isInvalidObject,
  checkUrl,
  copyContent,
  downloadAsJSON,
};
