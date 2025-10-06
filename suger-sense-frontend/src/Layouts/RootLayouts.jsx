import Navbar from "../Shared/NavBar/Navbar";
import Footer from "../Shared/Footer/Footer";
import { Outlet } from "react-router-dom";

const RootLayouts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayouts;
