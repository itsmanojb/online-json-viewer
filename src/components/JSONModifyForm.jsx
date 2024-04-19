import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ModuleMapping } from "../utils/config";
import { getObjectProps } from "../utils/helper";
import useJsonViewer from "../hooks/useJsonViewer";
import useObjectConverter from "../hooks/useObjectConverter";
import useAppContext from "../hooks/useAppContext";

export default function JSONModifyForm() {
  const { pathname } = useLocation();
  const { hideModal } = useAppContext();
  const {
    jsonOutput: json1,
    excludedProps: excludedProps1,
    sortOrder: viewerSortOrder,
    setSortOrder: setViewerSortOrder,
    resetSorting: resetViewerSorting,
    setExcludedProps: setViewerExcludedProps,
  } = useJsonViewer();

  const {
    jsonOutput: json2,
    excludedProps: excludedProps2,
    sortOrder: converterSortOrder,
    setSortOrder: setConverterSortOrder,
    resetSorting: resetConverterSorting,
    setExcludedProps: setConverterExcludedProps,
  } = useObjectConverter();

  let json,
    sortOrder,
    hiddenProps = [];

  if (pathname === ModuleMapping.Viewer) {
    json = json1;
    sortOrder = viewerSortOrder;
    hiddenProps = excludedProps1;
  } else if (pathname === ModuleMapping.Converter) {
    json = json2;
    sortOrder = converterSortOrder;
    hiddenProps = excludedProps2;
  }

  const [selected, setSelected] = useState(hiddenProps);
  const allProperties = getObjectProps(json);

  function handleSortOrderChange(field) {
    if (pathname === ModuleMapping.Viewer) {
      setViewerSortOrder(field);
    } else if (pathname === ModuleMapping.Converter) {
      setConverterSortOrder(field);
    }
  }

  function resetSort() {
    if (pathname === ModuleMapping.Viewer) {
      resetViewerSorting();
    } else if (pathname === ModuleMapping.Converter) {
      resetConverterSorting();
    }
  }

  const handleCheckBoxChanges = (val) => {
    if (selected.includes(val)) {
      setSelected(selected.filter((it) => it !== val));
    } else {
      setSelected([...selected, val]);
    }
  };

  const saveJSONOutput = () => {
    if (pathname === ModuleMapping.Viewer) {
      setViewerExcludedProps(selected);
    } else if (pathname === ModuleMapping.Converter) {
      setConverterExcludedProps(selected);
    }
    hideModal();
  };

  return (
    <div className="mt-2">
      <fieldset className="border px-4 py-6 rounded border-gray-300 dark:border-gray-700 mb-4 text-neutral-600 dark:text-gray-400">
        <legend className="text-xs text-gray-400 dark:text-gray-500">
          Sort properties
        </legend>
        <div className="flex gap-x-4">
          <label
            htmlFor="noSort"
            className="flex items-center gap-x-2 cursor-pointer">
            <input
              type="radio"
              name="nameSort"
              id="noSort"
              className="radio"
              checked={!sortOrder}
              onChange={() => resetSort()}
            />
            <span className="text-sm">None</span>
          </label>
          <label
            htmlFor="ascName"
            className="flex items-center gap-x-2 cursor-pointer">
            <input
              type="radio"
              name="nameSort"
              id="ascName"
              className="radio"
              checked={sortOrder === "asc"}
              onChange={() => handleSortOrderChange("asc")}
            />
            <span className="text-sm">Asc</span>
          </label>
          <label
            htmlFor="descName"
            className="flex items-center gap-x-2 cursor-pointer">
            <input
              type="radio"
              name="nameSort"
              id="descName"
              className="radio"
              checked={sortOrder === "desc"}
              onChange={() => handleSortOrderChange("desc")}
            />
            <span className="text-sm">Desc</span>
          </label>
        </div>
      </fieldset>
      <fieldset className="border rounded border-gray-300 dark:border-gray-700 mb-4 text-neutral-600 dark:text-gray-400">
        <legend className="text-xs ms-4">Exclude properties</legend>
        <div className="flex flex-col max-h-[150px] overflow-y-auto mt-2">
          {allProperties.map((prop, i) => (
            <label
              htmlFor={`option` + i}
              className="flex items-center gap-x-4 py-1 px-4"
              key={i}>
              <input
                type="checkbox"
                className="checkbox rounded-sm"
                name="excludedProps"
                id={`option` + i}
                value={prop}
                checked={selected.includes(prop)}
                onChange={(e) => handleCheckBoxChanges(e.target.value)}
              />
              <span className="text-sm">{prop}</span>
            </label>
          ))}
        </div>
        <div className="px-4 py-2">
          <button
            type="submit"
            className="btn-primary px-3 py-2"
            onClick={() => saveJSONOutput()}>
            Apply
          </button>
        </div>
      </fieldset>
    </div>
  );
}
