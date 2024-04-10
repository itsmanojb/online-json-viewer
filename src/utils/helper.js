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

export { classNames, isInvalidJSON, checkUrl };
