import { createBrowserRouter } from "react-router-dom";
import Layout from "./Componenets/Layout.jsx";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import SubmitForm from "./Pages/SubmitForm.jsx";
import Volunteer from "./Pages/Volunteer.jsx";
import Resources from "./Pages/Resources.jsx"; 
import AlertsMaps from "./Pages/AlertsMaps.jsx"; 
import Error_page from "./pages/Error_page.jsx"; // Import the ErrorPage component
const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // This layout will apply to all child routes
      children: [
        {
          path: "/",
          element: <Home />,
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
          path: "/Volunteer",
          element: <Volunteer />,
        },
        {
          path: "/Resources",
          element: <Resources />, 
        },
        {
          path: "/alertsmaps",  
          element: <AlertsMaps />,
        },
        {
          path: "*",
          element:<Error_page />,
        }
        
      ],
    },
  ]);

export default router; // ✅ Correct (default export)