import { createBrowserRouter } from "react-router-dom";
import Layout from "./Componenets/Layout.jsx";
import Home from "./Pages/Home.jsx";
import SubmitForm from "./Pages/SubmitForm.jsx";
import Volunteer from "./Pages/Volunteer.jsx";
import Resources from "./Pages/Resources.jsx"; // Import the Resources component
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
        }
        
      ],
    },
  ]);

export default router; 