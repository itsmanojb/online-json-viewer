import { Viewer } from "json-diff-kit";
import "json-diff-kit/dist/viewer.css";
import useJsonDiff from "../../hooks/useJsonDiff";
import useAppContext from "../../hooks/useAppContext";

export default function DiffOutput({ diff, onNewCompare }) {
  const { showModal } = useAppContext();
  const { setInputJson1, setInputJson2, viewerConfig } = useJsonDiff();

  function clearResult() {
    setInputJson1();
    setInputJson2();
    onNewCompare();
  }

  return (
    <>
      <div className="flex items-center divide-x divide-neutral-300 px-2 dark:divide-gray-600 border-b border-neutral-300 dark:border-gray-600">
        <button
          type="button"
          onClick={() => onNewCompare()}
          className="flex items-center gap-1 text-xs py-2 px-3 md:px-6 _btn">
          <span>Edit JSON</span>
        </button>
        <button
          type="button"
          onClick={() => showModal("diff-config")}
          className="flex items-center gap-1 text-xs py-2 px-3 md:px-6 _btn">
          <span>Configure</span>
        </button>
        <button
          type="button"
          onClick={() => clearResult()}
          className={`btn-primary text-xs px-3 py-1 w-20 md:w-40 ml-auto`}>
          <span>Reset</span>
        </button>
      </div>
      <Viewer
        diff={diff}
        {...viewerConfig}
        inlineDiffOptions={{
          mode: "word", // default `"char"`, but `"word"` may be more useful
          wordSeparator: " ", // default `""`, but `" "` is more useful for sentences
        }}
      />
    </>
  );
}
