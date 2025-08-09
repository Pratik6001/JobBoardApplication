import axios from "axios";
import React, { useState, useEffect } from "react";
import { useUser } from "../context/userContext";
export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [message, setMessage] = useState("");
  const roles = ["admin", "user"];

  const { setUser } = useUser();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/auth/sign`;
      const response = await axios.post(
        url,
        { name, email, password, role },
        { withCredentials: true }
      );
      const data = response.data;

      if (response.status === 200 || response.status === 201) {
        setMessage(data.message);
        setName("");
        setEmail("");
        setPassword("");
        setRole("");
        setCurrentPage("login");
      } else {
        setMessage(data.message || "Singup failed");
      }
    } catch (error) {
      console.error("Eorro during signup:", error);
      setMessage(
        error.response?.data?.message ||
          "An error occurred during singup. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/auth/login`;
      const response = await axios.post(
        url,
        { email, password },
        { withCredentials: true }
      );
      const data = response.data;
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        setUser(data.userData);
        setIsLoggedIn(true);
        setMessage("Login successful!");

        if (data.url) {
          window.location.href = data.url;
        } else {
          setCurrentPage("dashboard");
          console.warn(
            "Backend did not provide a redirect URL. Navigating to default dashboard."
          );
        }
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage(
        error.response?.data?.message ||
          "An error occurred during login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("login");
    setName("");
    setEmail("");
    setPassword("");
    setRole("admin");
    setMessage("You have been logged out.");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center font-inter p-4">
      <div className="w-full max-w-md">
        {currentPage === "login" && (
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
            <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
              Admin Panel
            </h1>
            <p className="text-center text-gray-600 mb-6">
              Secure Access Portal
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
                disabled={loading}
              >
                {loading ? "Logging In..." : "Login"}
              </button>
            </form>

            {message && (
              <p
                className={`mt-4 text-center text-sm font-medium ${
                  message.includes("success")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}

            <p className="mt-6 text-center text-gray-600 text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => {
                  setCurrentPage("signup");
                  setMessage("");
                  setEmail("");
                  setPassword("");
                }}
                className="text-indigo-600 hover:underline font-medium"
              >
                Sign Up
              </button>
            </p>
          </div>
        )}

        {currentPage === "signup" && (
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
              Create Admin Account
            </h1>
            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-1"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-1"
                  htmlFor="role"
                >
                  Role
                </label>
                <select
                  id="role"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select your role</option>
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>

            {message && (
              <p
                className={`mt-4 text-center text-sm font-medium ${
                  message.includes("success")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}

            <p className="mt-6 text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => {
                  setCurrentPage("login");
                  setMessage("");
                  setEmail("");
                  setPassword("");
                }}
                className="text-green-600 hover:underline font-medium"
              >
                Login
              </button>
            </p>
          </div>
        )}

        {currentPage === "dashboard" && isLoggedIn && (
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Welcome to Your Admin Panel!
            </h2>
            <p className="text-gray-700 mb-6">
              You've successfully logged in. If you're not redirected, please
              contact support or check your account settings.
            </p>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-600 to-rose-500 text-white py-3 px-6 rounded-lg hover:from-red-700 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
