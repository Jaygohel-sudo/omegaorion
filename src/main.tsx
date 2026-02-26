import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import PeoplePage from "./components/pages/People/PeoplePage";
import "./index.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <PeoplePage /> }, // default route
      { path: "people", element: <PeoplePage /> }, // /people
      { path: "my-info", element: <div className="p-6">My Info</div> },
      {
        path: "team-management",
        element: <div className="p-6">Team Management</div>,
      },
      {
        path: "project-setup",
        element: <div className="p-6">Project Setup</div>,
      },
      { path: "hiring", element: <div className="p-6">Hiring</div> },
      { path: "report", element: <div className="p-6">Report</div> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
