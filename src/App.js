import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import JSONViewer from "./components/JSONViewer/Viewer";
// import XML2JSONConverter from "./components/XML2JSON/XML2JSONConverter";
import AppShell from "./components/AppShell";
import ErrorBoundary from "./components/ErrorBoundary";
import { AppContextProvider } from "./contexts/AppContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        path: "",
        element: <Navigate to={"/viewer-editor"} />,
      },
      {
        path: "viewer-editor",
        element: <JSONViewer />,
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
