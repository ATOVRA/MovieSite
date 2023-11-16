// Styles
import "./App.css";

// Packes
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";

// Layouts
import { RootLayout } from "./Layouts/RootLayout";

// Pages
import { Home } from "./Pages/Home/Home";
import { Discover } from "./Pages/Discover/Discover";
import { FilmDetail } from "./Components/Film Detail/FilmDetail";

// Context
import { GlobalContext } from "./Context/GlobalContext";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "filmDetail/id/:id",
          element: <FilmDetail />,
        },
        {
          path: "discover",
          element: <Discover />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
