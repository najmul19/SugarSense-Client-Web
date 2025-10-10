import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import GradientButton from "../../Shared/Buttons/GradientButton";
import { FaHome } from "react-icons/fa";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-gradient-to-b bg-gray-900 text-white min-h-screen p-6">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          {/* <Link to="/dashboard" className="hover:text-gray-200">
            Dashboard Home
          </Link>
          <Link to="/dashboard/manage-users" className="hover:text-gray-200">
            Manage Users
          </Link>
          <Link to="/dashboard/api-docs" className="hover:text-gray-200">
            API Docs
          </Link> */}
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `hover:text-gray-200 ${
                isActive ? "text-gray-900 card-bg px-3 py-2 rounded-md" : ""
              }`
            }
          >
            Dashboard Home
          </NavLink>

          <NavLink
            to="/dashboard/manage-users"
            className={({ isActive }) =>
              `hover:text-gray-200 ${
                isActive ? "text-gray-900 card-bg px-3 py-2 rounded-md" : ""
              }`
            }
          >
            Manage Users
          </NavLink>

          <NavLink
            to="/dashboard/api-docs"
            className={({ isActive }) =>
              `hover:text-gray-200 ${
                isActive ? "text-gray-900 card-bg px-3 py-2 rounded-md" : ""
              }`
            }
          >
            API Docs
          </NavLink>

          <Link to="/" className="flex items-center gap-2">
            <FaHome className="text-white text-lg" />
            <GradientButton text="Back to Home" />
          </Link>
        </nav>
      </aside>

      {/* Mobile Top Navbar */}
      <header className="flex md:hidden justify-between items-center bg-gray-900 text-white px-4 py-3 z-50 relative">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <X className="text-red-400 cursor-pointer hover:text-gray-700" size={24} />
          ) : (
            <Menu size={24} className="cursor-pointer hover:text-gray-700" />
          )}
        </button>
      </header>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 right-0 z-40 bg-gray-800 text-white p-6 flex flex-col space-y-4 pt-16 transform transition-all duration-500 ease-in-out ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        {/* <Link className="cursor-pointer hover:text-gray-400" to="/dashboard" onClick={() => setIsOpen(false)}>
          Dashboard Home
        </Link> */}
        <NavLink
          to="/dashboard"
          end
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `cursor-pointer hover:text-gray-400 ${
              isActive ? "text-gray-900 card-bg px-3 py-2 rounded-md" : ""
            }`
          }
        >
          DashBoard
        </NavLink>

        <NavLink
          to="/dashboard/manage-users"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `cursor-pointer hover:text-gray-400 ${
              isActive ? "text-gray-900 card-bg px-3 py-2 rounded-md" : ""
            }`
          }
        >
          Manage Users
        </NavLink>

        <NavLink
          to="/dashboard/api-docs"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `cursor-pointer hover:text-gray-400 ${
              isActive ? "text-gray-900 card-bg px-3 py-2 rounded-md" : ""
            }`
          }
        >
          Get CSV File
        </NavLink>

        <Link
          className="cursor-pointer hover:text-gray-400"
          to="/"
          onClick={() => setIsOpen(false)}
        >
          <GradientButton text="Back to Home" />
        </Link>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
