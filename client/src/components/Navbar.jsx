import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";

export function Navbar() {
  const isAuthenticated = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Navigate to home after logout
  };

  const handleDashboardNavigation = () => {
    const role = localStorage.getItem("role"); // Assume role is stored in localStorage
    if (role === "organizer") {
      navigate("/organizer/dashboard");
    } else if (role === "user") {
      navigate("/dashboard");
    } else {
      navigate("/"); // Default to home if role is undefined
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Compass className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">TravelHub</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <button
                  onClick={handleDashboardNavigation}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
