import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@mui/material";
import Theme from "./global/Theme.ts";
import { DataProvider } from "./global/context/DataContext.tsx";
import { AuthProvider } from "./global/context/AuthContext.tsx";
import { PageProvider } from "./global/context/PageContext.tsx";

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
