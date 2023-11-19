import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const ContextProvider = ({ children }) => {
  // Header Search Input Value
  const [search, setSearch] = useState(() => {
    const search = JSON.parse(localStorage.getItem("search"));
    return search || "";
  });
  
  // Film Search Values
  const [searchValue, setSearchValue] = useState(() => {
    const searchValue = JSON.parse(localStorage.getItem("searchValue"));
    return searchValue || "";
  });

  useEffect(() => {
    localStorage.setItem("searchValue", JSON.stringify(searchValue));
  }, [searchValue]);

  // Film Page Controls
  const [page, setPage] = useState(() => {
    const page = JSON.parse(localStorage.getItem("page"));
    return page || 1;
  });

  useEffect(() => {
    localStorage.setItem("page", JSON.stringify(page));
  }, [page]);

  // Chart API Value
  const [series, setSeires] = useState(0)

  return (
    <GlobalContext.Provider
      value={{ search, setSearch, searchValue, setSearchValue, page, setPage, series, setSeires }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
