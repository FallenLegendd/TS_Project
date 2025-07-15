import { createRoot } from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AlertProvider } from "./features/alert";
import { NotificationProvider } from "./features/notification/provider/NotificationProvider";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
    <BrowserRouter>
    <NotificationProvider>
    <AlertProvider>
      <App />
    </AlertProvider>
    </NotificationProvider>
  </BrowserRouter>
);
