import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import JSONViewer from "./components/JSONViewer/Viewer";
import JSObjectConverter from "./components/Obj2JSON/Converter";
// import XML2JSONConverter from "./components/XML2JSON/XML2JSONConverter";
import AppShell from "./components/AppShell";
import ErrorBoundary from "./components/ErrorBoundary";
import { AppContextProvider } from "./contexts/AppContext";
import { ModuleMapping } from "./utils/config";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        path: "",
        element: <Navigate to={ModuleMapping.Viewer} />,
      },
      {
        path: ModuleMapping.Viewer,
        element: <JSONViewer />,
      },
      {
        path: ModuleMapping.Converter,
        element: <JSObjectConverter />,
      },
      // {
      //   path: "xml-json",
      //   element: <XML2JSONConverter />,
      // },
    ],
    errorElement: <ErrorBoundary />,
  },
]);

function App() {
  return (
    <AppContextProvider>
      <RouterProvider router={router} />
      <Toaster position="center-bottom" />
    </AppContextProvider>
  );
}

export default App;
