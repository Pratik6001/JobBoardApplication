import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import HomeLayout from "./layout/HomeLayout";
import Unauthorized from "./pages/Unauthorized";
import JobApplicationForm from "./pages/Apply";
import Admin from "./components/admin/Admin";
import AdminLayout from "./layout/AdminLayout";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Unauthorized page */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* Loging Page*/}
        <Route path="/login" element={<Login />} />

        {/* Layout Route */}
        <Route path="/" element={<HomeLayout />}>
          {/* This will render Home inside HomeLayout via <Outlet /> */}
          <Route index element={<Home />} />
          <Route path="/apply/:id" element={<JobApplicationForm />} />
        </Route>

        {/* Role-based layout protection */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
