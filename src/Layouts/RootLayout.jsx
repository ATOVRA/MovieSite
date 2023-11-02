// Styles
import "../App.css"

// Packes
import { Outlet } from "react-router-dom";

// Hooks
import { useContext } from "react";

// Components
import { Header } from "../Components/Header/Header";

export const RootLayout = () => {
  
  return (
    <div className="site-container">
      <Header/>
      <main>
        <Outlet/>
      </main>
      <footer></footer>
    </div>
  );
};
