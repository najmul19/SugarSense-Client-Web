import Navbar from "../Shared/NavBar/Navbar";
import Footer from "../Shared/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import FloatingChatbot from "../Shared/FloatingChatbot/FloatingChatbot";

const RootLayouts = () => {
  //  const location = useLocation();
  // const hideChat = location.pathname === "/chatbot";
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      {/* {!hideChat && <FloatingChatbot />} */}
      <Footer />
    </div>
  );
};

export default RootLayouts;
