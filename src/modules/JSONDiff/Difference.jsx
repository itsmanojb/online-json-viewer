import { useEffect } from "react";
import InputJSON1 from "./InputJSON1";
import InputJSON2 from "./InputJSON2";
import useJsonDiff from "../../hooks/useJsonDiff";
import DiffOutput from "./DiffOutput";

const Difference = () => {
  useEffect(() => {
    document.title = "JSON Diff";
  }, []);

  const {
    jsonInput1,
    jsonInput2,
    invalidInput1,
    invalidInput2,
    compareJson,
    resetDiff,
    diff,
  } = useJsonDiff();

  return (
    <div
      className="flex flex-col lg:flex-row overflow-hidden divide-y lg:divide-y-0 lg:divide-x dark:bg-[#2b303b]"
      style={{ height: "calc(100vh - 39px)" }}
    >
      {!diff ? (
        <div className="flex-1 relative flex flex-col md:flex-row divide-x divide-neutral-300 dark:divide-gray-600">
          <div className="flex-1 pb-9 ">
            <InputJSON1 />
          </div>
          {jsonInput1 && jsonInput2 && !invalidInput1 && !invalidInput2 && (
            <div className="absolute z-10 left-1/2 top-1/2">
              <button
                type="button"
                onClick={() => compareJson()}
                className="h-16 w-16 rounded-full bg-cyan-500 hover:bg-cyan-600 font-semibold text-xs text-white -translate-x-1/2 -translate-y-2"
              >
                Compare
              </button>
            </div>
          )}
          <div className="flex-1 pb-9 ">
            <InputJSON2 />
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto relative pb-9 min-h-[60vh] md:min-h-0">
          <DiffOutput diff={diff} onNewCompare={() => resetDiff()} />
        </div>
      )}
    </div>
  );
};

export default Difference;
