import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@mui/material";
import Theme from "./global/Theme.ts";
import { DataProvider } from "./global/context/DataContext.tsx";
import { AuthProvider } from "./global/context/AuthContext.tsx";
import { PageProvider } from "./global/context/PageContext.tsx";

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/cacheSW.js", {
        scope: "/",
      });
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

registerServiceWorker();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={Theme}>
      <AuthProvider>
        <PageProvider>
          <DataProvider>
            <App />
          </DataProvider>
        </PageProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
