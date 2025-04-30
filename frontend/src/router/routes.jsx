import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import SubmitCase from "@/pages/SubmitCase";
import AlertsMap from "@/pages/AlertsMap";
import Search from "@/pages/Search";
import Resources from "@/pages/Resources";
import Volunteer from "@/pages/Volunteer";
import About from "@/pages/About";
import Privacy from "@/pages/Privacy";
import SuccessStories from "@/pages/SuccessStories";
import OfflineToolkit from "@/pages/OfflineToolkit";
import PartnerPortal from "@/pages/PartnerPortal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "submit", element: <SubmitCase /> },
      { path: "alerts", element: <AlertsMap /> },
      { path: "search", element: <Search /> },
      { path: "resources", element: <Resources /> },
      { path: "volunteer", element: <Volunteer /> },
      { path: "about", element: <About /> },
      { path: "privacy", element: <Privacy /> },
      { path: "stories", element: <SuccessStories /> },
      { path: "toolkit", element: <OfflineToolkit /> },
      { path: "partners", element: <PartnerPortal /> },
    ],
  },
]);

export default router;
