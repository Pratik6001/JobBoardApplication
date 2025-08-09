import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, User } from "lucide-react";
import { useUser } from "../../context/userContext";

export default function TopBar1() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useUser();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth
    localStorage.removeItem("token");
    navigate("/");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex p-4 px-8 justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="bg-white p-2 rounded-full shadow-md">
          <Briefcase size={28} className="text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-blue-100 text-sm">
            Manage job postings and applications
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        <Link
          to={"/"}
          className="px-5 py-2 rounded-lg font-semibold bg-white text-blue-600 hover:bg-blue-100 transition duration-200 shadow"
        >
          View Job Board
        </Link>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="bg-white p-2 rounded-full shadow-md hover:bg-blue-100 transition"
            aria-label="User menu"
          >
            <User size={22} className="text-blue-600" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 text-gray-700">
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="font-semibold truncate">
                  {user?.username || "User"}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {user?.roles || "Role"}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full font-semibold text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
