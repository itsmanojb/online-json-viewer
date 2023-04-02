import InputJSON from "./InputJSON";
import OutputJSON from "./OutputJSON";

const JSONViewer = () => {
  return (
    <div
      className="flex flex-col lg:flex-row overflow-hidden divide-y lg:divide-y-0 lg:divide-x"
      style={{ height: "calc(100vh - 51px)" }}
    >
      <div className="flex-1 relative pb-9">
        <InputJSON />
      </div>
      <div className="flex-1 relative pb-9 min-h-[60vh] md:min-h-0">
        <OutputJSON />
      </div>
    </div>
  );
};

export default JSONViewer;
