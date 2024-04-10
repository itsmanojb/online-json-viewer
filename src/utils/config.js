export const ModuleMapping = {
  Viewer: "viewer-editor",
  Converter: "object-to-json",
  Compare: "json-compare",
  XML: "xml-to-json",
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
    label: "Compare",
    url: ModuleMapping.Compare,
    disabled: true,
  },
  {
    id: 3,
    label: "JS to JSON",
    url: ModuleMapping.Converter,
    disabled: false,
  },
  {
    id: 4,
    label: "XML to JSON",
    url: ModuleMapping.XML,
    disabled: true,
  },
];
