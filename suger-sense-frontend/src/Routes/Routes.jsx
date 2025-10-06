import { createBrowserRouter } from "react-router-dom";
import RootLayouts from "../Layouts/RootLayouts";
import PredictionForm from "../components/PredictionForm";
import Home from "../Pages/Home/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home
      }
    ]
  },
]);
