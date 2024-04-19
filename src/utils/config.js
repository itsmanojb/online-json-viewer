export const ModuleMapping = {
  Viewer: "/viewer-editor",
  Converter: "/object-to-json",
  Diff: "/json-diff",
  XML: "/xml-to-json",
};

export const AppModules = [
  {
    id: 1,
    label: "Viewer",
    url: ModuleMapping.Viewer,
    disabled: false,
  },
  {
    id: 2,
    label: "JS to JSON",
    url: ModuleMapping.Converter,
    disabled: false,
  },
  {
    id: 3,
    label: "JSON Diff",
    url: ModuleMapping.Diff,
    disabled: false,
  },
  {
    id: 4,
    label: "XML to JSON",
    url: ModuleMapping.XML,
    disabled: true,
  },
];
