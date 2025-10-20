import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

window.Telegram?.WebApp?.ready();
window.Telegram?.WebApp?.expand();

createRoot(document.getElementById("root")!).render(<App />);
