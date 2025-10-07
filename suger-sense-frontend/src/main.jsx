import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvide from "./context/AuthProvider/AuthProvide.jsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <RouterProvider router={router} /> */}
    <AuthProvide>
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={router}
          fallbackElement={<div>Loading...</div>}
        />
      </QueryClientProvider>
    </AuthProvide>
  </StrictMode>
);
