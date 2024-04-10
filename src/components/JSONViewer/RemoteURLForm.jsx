import { useState } from "react";
import { toast } from "react-hot-toast";
import { checkUrl, classNames } from "../../utils/helper";
import useAppContext from "../../hooks/useAppContext";
import useJsonViewer from "../../hooks/useJsonViewer";

export default function RemoteURLForm() {
  const [url, setUrl] = useState("");
  const [invalidURL, setInvalidURL] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { hideModal } = useAppContext();
  const { setInputJson, setOutputJson, indent } = useJsonViewer();

  function handleInputChange(value) {
    setUrl(value);
    setInvalidURL(checkUrl(value));
  }

  function loadRemoteData(e) {
    e.preventDefault();
    if (url.trim() === "" || invalidURL) return;

    setSubmitted(true);
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          toast.success("Remote data loaded successfully");
          const jsonInput = JSON.stringify(result);
          setInputJson(jsonInput);
          const formatted = JSON.stringify(
            JSON.parse(jsonInput),
            null,
            +indent
          );
          setOutputJson(formatted);
          hideModal();
        },
        (error) => {
          setSubmitted(false);
          toast.error("Failed to load data. Look console for error.");
          console.error(error);
        }
      );
  }

  return (
    <div>
      <form>
        <label
          htmlFor="remote-url"
          className="block text-sm font-medium leading-6 text-neutral-700">
          API / Remote Data URL
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="url"
            name="remote-url"
            id="remote-url"
            className={classNames(
              "input py-2",
              invalidURL ? "ring-red-300" : "ring-slate-300"
            )}
            placeholder="https://www.example.com"
            value={url}
            onChange={(e) => handleInputChange(e.target.value)}
            onPaste={(e) => handleInputChange(e.target.value)}
          />
          {invalidURL && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 text-red-500">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="btn-primary px-3 py-2"
            disabled={invalidURL || url.trim() === ""}
            onClick={loadRemoteData}>
            {url.trim() === ""
              ? "Enter URL"
              : invalidURL
              ? "Enter Valid URL"
              : submitted
              ? "Please Wait..."
              : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
