import React from "react";
import TopBar1 from "../components/admin/TopBar1";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex flex-col h-screen">
      <TopBar1 />
      <main className="flex-1 overflow-auto bg-gray-50 p-16">
        <Outlet />
      </main>
    </div>
  );
}
