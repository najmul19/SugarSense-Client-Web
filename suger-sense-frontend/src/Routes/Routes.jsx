import { createBrowserRouter } from "react-router-dom";
import RootLayouts from "../Layouts/RootLayouts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
  },
]);
