// Styles
import "./Header.css";
import { BiSearchAlt } from "react-icons/bi";

// Packes
import { NavLink } from "react-router-dom";

// Hooks
import { useContext, useEffect, useRef, useState } from "react";

// Context
import { GlobalContext } from "../../Context/GlobalContext";

export const Header = () => {
  const { search, setSearch, searchValue, setSearchValue, setPage } = useContext(GlobalContext);
  const [checked, setChecked] = useState(false);
  const [searchCheck, setSearchCheck] = useState(false);
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 320px)").matches
  );
  const checkedRef = useRef(null);

  //  Search Input & Button Control
  const SearchBtn = () => {
    setSearchValue(search);
    setPage(1);
  };

  const EnterBtn = (e) => {
    const newSearchValue = e.target.value || ""
    if (e.keyCode === 13 ) {
      setSearchValue(newSearchValue);
      setPage(1);
    }
  };

  const handleSearch = () => {
    setSearchCheck(!searchCheck);
    if (!searchCheck) {
      setChecked(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("search", JSON.stringify(search));
  }, [search]);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);
    const mediaQuery = window.matchMedia("(max-width: 320px)");

    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, [matches]);

  //  Header Responsive Menu Control
  const handleCheck = (e) => {
    if (e.target.checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
    if (!checked) {
      setSearchCheck(false);
    }
  };

  const handleClick = (e) => {
    if (!e.target.closest(".menu-checkbox-contain")) {
      setChecked(false);
      checkedRef.current.checked = false;
    }
    if (!e.target.closest(".head-search-contain")) {
      setSearchCheck(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", EnterBtn);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", EnterBtn);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <header className="header">
      <h1 className="header-logo">
        <NavLink to="/">
          This
          <br />
          Movie
        </NavLink>
      </h1>
      <div className="header-basic-contain">
        <nav className="header-nav">
          <ul className="nav-ul">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/discover">Discover</NavLink>
            </li>
            <li>
              <NavLink>Contact</NavLink>
            </li>
            <li>
              <NavLink>Support</NavLink>
            </li>
          </ul>
        </nav>
        <div className="head-search-contain">
          <input
            type="text"
            placeholder="Search"
            className="head-search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search"
            className="head-res-search-input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={
              searchCheck
                ? { width: "160px", padding: "0 5px" }
                : { width: "0", padding: "0" }
            }
          />
          <button className="head-search-btn" onClick={SearchBtn}>
            Search
          </button>
          <button
            className="head-res-search-btn"
            onClick={handleSearch}
            style={
              searchCheck
                ? { borderBottomLeftRadius: "0", borderTopLeftRadius: "0" }
                : { borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }
            }
          >
            <BiSearchAlt />
          </button>
        </div>

        <div
          className="menu-checkbox-contain"
          style={
            searchCheck
              ? matches
                ? { display: "none" }
                : { display: "block" }
              : {}
          }
        >
          <input
            type="checkbox"
            id="checkbox"
            onChange={handleCheck}
            ref={checkedRef}
          />
          <label htmlFor="checkbox" className="toggle">
            <div className="bars" id="bar1"></div>
            <div className="bars" id="bar2"></div>
            <div className="bars" id="bar3"></div>
          </label>
        </div>

        <div
          className="header-responsive-menu"
          style={checked ? { height: "230px" } : { height: "0" }}
        >
          <ul className="responsive-nav-ul">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="discover">Discover</NavLink>
            </li>
            <li>
              <NavLink>Contact</NavLink>
            </li>
            <li>
              <NavLink>Support</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
