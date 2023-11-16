import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ContextProvider } from "./Context/GlobalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
