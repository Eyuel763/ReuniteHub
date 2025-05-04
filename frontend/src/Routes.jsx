import { createBrowserRouter } from "react-router-dom";
import Layout from "./Componenets/Layout.jsx";
import Home from "./Pages/Home.jsx";
import SubmitForm from "./Pages/SubmitForm.jsx";
import Volunteer from "./Pages/Volunteer.jsx";
import Resources from "./Pages/Resources.jsx"; // Import the Resources component
import Error_page from "./pages/Error_page.jsx"; // Import the ErrorPage component
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // This layout will apply to all child routes
    errorElement: <Error_page />, // Render Error_page for invalid routes or errors
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
      },
      {
        path: "/alertsmaps",
        element: <AlertsMaps />,
      },
    ],
  },
]);

export default router;