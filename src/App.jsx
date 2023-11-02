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

  const [searchValue, setSearchValue] = useState(() => {
    const searchValue = JSON.parse(localStorage.getItem("searchValue"))
    return searchValue || ""
  });

  useEffect(() => {
    localStorage.setItem("searchValue", JSON.stringify(searchValue));
  }, [searchValue]);

  const [page, setPage] = useState(() => {
    const page = JSON.parse(localStorage.getItem("page"));
    return page || 1;
  });

  useEffect(() => {
    localStorage.setItem("page", JSON.stringify(page));
  }, [page]);

  return (
    <GlobalContext.Provider
      value={{ searchValue, setSearchValue, page, setPage }}
    >
      <div className="App">
        <RouterProvider router={routes} />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
