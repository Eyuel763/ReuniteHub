import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "../Pages/Home.jsx";
import About from "../Pages/About.jsx";
import SubmitForm from "../Pages/SubmitForm.jsx";
import Volunteer from "../Pages/Volunteer.jsx";
import Resources from "../Pages/Resources.jsx"; 
import AlertsMaps from "../Pages/AlertsMaps.jsx"; 

const router = createBrowserRouter([
  {
    path: "/",  // The base path is the root (home) page
    element: <Layout />,  // This layout wraps all pages
    children: [
      {
        path: "/",
        element: <Home />,  // Home page for the root path
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/submitform",
        element: <SubmitForm />,
      },
      {
        path: "/volunteer",
        element: <Volunteer />,
      },
      {
        path: "/resources",
        element: <Resources />, 
      },
      {
        path: "/alertsmaps",  
        element: <AlertsMaps />,
      }
    ],
  },
]);

export default router;
