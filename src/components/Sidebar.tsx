"use client";

import {
  Calendar,
  Car,
  FileText,
  LayoutDashboard,
  Menu,
  User,
} from "lucide-react";
import React from "react";

type SidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  activeTab: string;
  setActiveTab: (value: string) => void;
};

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  activeTab,
  setActiveTab,
}: SidebarProps) {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className={`font-bold text-xl ${!isSidebarOpen && "hidden"}`}>
          VehicleMS
        </h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center p-3 rounded-lg hover:bg-gray-100 ${
                activeTab === "profile" ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              <User size={20} />

              <span className={`ml-3 ${!isSidebarOpen && "hidden"}`}>
                Profile
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center p-3 rounded-lg hover:bg-gray-100 ${
                activeTab === "dashboard" ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              <LayoutDashboard size={20} />
              <span className={`ml-3 ${!isSidebarOpen && "hidden"}`}>
                Dashboard
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`w-full flex items-center p-3 rounded-lg hover:bg-gray-100 ${
                activeTab === "bookings" ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              <Calendar size={20} />
              <span className={`ml-3 ${!isSidebarOpen && "hidden"}`}>
                Bookings
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("vehicles")}
              className={`w-full flex items-center p-3 rounded-lg hover:bg-gray-100 ${
                activeTab === "vehicles" ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              <Car size={20} />
              <span className={`ml-3 ${!isSidebarOpen && "hidden"}`}>
                Vehicles
              </span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("approvals")}
              className={`w-full flex items-center p-3 rounded-lg hover:bg-gray-100 ${
                activeTab === "approvals" ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              <FileText size={20} />
              <span className={`ml-3 ${!isSidebarOpen && "hidden"}`}>
                Approvals
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
