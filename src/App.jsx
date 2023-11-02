// Styles
import "./App.css";

// Packes
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Hooks
import { useState } from "react";

// Layouts
import { RootLayout } from "./Layouts/RootLayout";

// Pages
import { Home } from "./Pages/Home/Home";
import { Discover } from "./Pages/Discover/Discover";

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
          path: "/discover",
          element: <Discover />,
        },
      ],
    },
  ]);

  const [searchValue, setSearchValue] = useState("");

  return (
    <GlobalContext.Provider value={{searchValue, setSearchValue}}>
      <div className="App">
        <RouterProvider router={routes} />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
