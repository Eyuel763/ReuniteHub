// src/App.jsx
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/routes";

function App() {
  return (
    <div className="font-sans bg-gray-50 min-h-screen text-gray-900">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
