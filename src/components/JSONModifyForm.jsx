import React from "react";

export default function JSONModifyForm() {
  return (
    <div className="mt-2">
      <fieldset className="border px-4 py-6 rounded border-gray-300 dark:border-gray-700 mb-4 text-neutral-600 dark:text-gray-400">
        <legend className="text-xs px-2">Sort properties (top-level)</legend>
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center justify-between">
            <label
              htmlFor="sortByName"
              className="flex items-center gap-x-2 cursor-pointer">
              <input
                type="radio"
                name="sortOrder"
                id="sortByName"
                className="radio"
              />
              <span className="text-sm">Sort by `name`</span>
            </label>
            <div className="flex gap-x-2">
              <label
                htmlFor="ascName"
                className="flex items-center gap-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="nameSort"
                  id="ascName"
                  className="radio"
                />
                <span className="text-xs">Asc</span>
              </label>
              <label
                htmlFor="descName"
                className="flex items-center gap-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="nameSort"
                  id="descName"
                  className="radio"
                />
                <span className="text-xs">Desc</span>
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="sortByVal"
              className="flex items-center gap-x-2 cursor-pointer">
              <input
                type="radio"
                name="sortOrder"
                id="sortByVal"
                className="radio"
              />
              <span className="text-sm">Sort by `value`</span>
            </label>
            <div className="flex gap-x-2">
              <label
                htmlFor="ascVal"
                className="flex items-center gap-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="valueSort"
                  id="ascVal"
                  className="radio"
                />
                <span className="text-xs">Asc</span>
              </label>
              <label
                htmlFor="descVal"
                className="flex items-center gap-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="valueSort"
                  id="descVal"
                  className="radio"
                />
                <span className="text-xs">Desc</span>
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="sortByNone"
              className="flex items-center gap-x-2 cursor-pointer">
              <input
                type="radio"
                name="sortOrder"
                id="sortByNone"
                className="radio"
              />
              <span className="text-sm">Initial order</span>
            </label>
          </div>
        </div>
      </fieldset>
      <div>
        <button type="submit" className="btn-primary px-3 py-2">
          Save
        </button>
      </div>
    </div>
  );
}
