import React from "react";
import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";
import { useUser } from "../context/userContext";
export default function TopBar() {
  const { user } = useUser();
  return (
    <div className="flex p-4 px-8 justify-between items-center bg-gradient-to-r from-green-500 to-emerald-600 shadow-md">
      <div className="flex items-center gap-3">
        <div className="bg-white p-2 rounded-full shadow-md">
          <Briefcase size={28} className="text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">JobBoard</h1>
          <p className="text-green-100 text-sm">
            Find your perfect job opportunity
          </p>
        </div>
      </div>
      <div>
        {user?.roles === "admin" ? (
          <Link
            to={"/admin"}
            className="px-5 py-2 rounded-lg font-semibold bg-white text-green-600 hover:bg-green-100 transition duration-200 shadow"
          >
            Admin panel
          </Link>
        ) : (
          <Link
            to={"/login"}
            className="px-5 py-2 rounded-lg font-semibold bg-white text-green-600 hover:bg-green-100 transition duration-200 shadow"
          >
            Admin Login
          </Link>
        )}
      </div>
    </div>
  );
}
