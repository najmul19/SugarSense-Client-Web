import Navbar from "../Shared/NavBar/Navbar";
import Footer from "../Shared/Footer/Footer";
import { Outlet } from "react-router-dom";

const RootLayouts = () => {
  return (
    <div>
      {<Navbar></Navbar>}
      <Outlet></Outlet>
      {<Footer></Footer>}
    </div>
  );
};

export default RootLayouts;
