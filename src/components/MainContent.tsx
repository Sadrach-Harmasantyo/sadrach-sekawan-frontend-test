"use client";

import { BarChart } from "lucide-react";
import React from "react";
import { Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const vehicleUsageData = [
  { month: "Jan", passenger: 65, cargo: 45 },
  { month: "Feb", passenger: 59, cargo: 49 },
  { month: "Mar", passenger: 80, cargo: 55 },
  { month: "Apr", passenger: 71, cargo: 48 },
  { month: "May", passenger: 56, cargo: 51 },
  { month: "Jun", passenger: 89, cargo: 60 },
];

export default function MainContent({ activeTab }: { activeTab: string }) {
  return (
    <main className="p-6">
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Total Bookings</h3>
              <p className="text-2xl font-bold mt-2">256</p>
              <span className="text-green-500 text-sm">↑ 12% from last month</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Active Vehicles</h3>
              <p className="text-2xl font-bold mt-2">48</p>
              <span className="text-blue-500 text-sm">32 owned, 16 rented</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Pending Approvals</h3>
              <p className="text-2xl font-bold mt-2">12</p>
              <span className="text-yellow-500 text-sm">Requires attention</span>
            </div>
          </div>

          {/* Vehicle Usage Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Vehicle Usage Trends</h3>
            <div style={{ width: "100%", height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vehicleUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="passenger" name="Passenger Vehicles" fill="#4F46E5" />
                  <Bar dataKey="cargo" name="Cargo Vehicles" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold">Recent Bookings</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">#12345</td>
                    <td className="px-6 py-4 whitespace-nowrap">Toyota Innova</td>
                    <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Approved</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">2024-01-02</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
