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
    
    <div className="max-w-[1440px] mx-auto bg-gradient-to-b from-[#fafcfd] via-[#eafaf7b3] to-[#ffe9d63c]">
      <AuthProvide>
        <QueryClientProvider client={queryClient}>
          <RouterProvider
            router={router}
            fallbackElement={<div>Loading...</div>}
          />
        </QueryClientProvider>
      </AuthProvide>
    </div>
  </StrictMode>
);
