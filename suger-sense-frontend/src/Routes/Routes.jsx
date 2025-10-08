import { createBrowserRouter } from "react-router-dom";
import RootLayouts from "../Layouts/RootLayouts";
import PredictionForm from "../components/PredictionForm";
import Home from "../Pages/Home/Home/Home";
import History from "../Pages/History/History";
import Dashboard from "../Pages/Dashboard/Dashboard";
import FeatureImportance from "../Pages/FeatureImportance/FeatureImportance";
import ApiDocs from "../Pages/ApiDocs/ApiDocs";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/SignUp/Register";
import PrivateRout from "./PrivateRout";
import DiabetesEducation from "../Pages/DiabetesEducatio/DiabetesEducation";
import BMICalculator from "../Pages/BMICalculator/BMICalculator";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "predict",
        element: (
          <PrivateRout>
            <PredictionForm></PredictionForm>
          </PrivateRout>
        ),
      },
      {
        path: "history",
        element: (
          <PrivateRout>
            <History></History>
          </PrivateRout>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRout>
            <Dashboard></Dashboard>
          </PrivateRout>
        ),
      },
      {
        path: "features",
        Component: FeatureImportance,
      },
      {
        path: "api-docs",
        Component: ApiDocs,
      },
      {
        path: "diabetesEdu",
        Component: DiabetesEducation,
      },
      {
        path: "bmiCalculation",
        Component: BMICalculator,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Register },
    ],
  },
]);
