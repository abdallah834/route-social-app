import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import { router } from "./routing/AppRouting";
import ContextProvider from "./context/Context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "react-loading-skeleton/dist/skeleton.css";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  // caching and context
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </ContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
