import React from "react";
import TopBar from "../components/TopBar";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <main className="flex-1 overflow-auto bg-gray-50 p-16">
        <Outlet />
      </main>
    </div>
  );
}
