"use client";

import React, { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import nookies from "nookies";
import { parseCookies } from "nookies";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const vehicleUsageData = [
  { month: "Jan", passenger: 65, cargo: 45 },
  { month: "Feb", passenger: 59, cargo: 49 },
  { month: "Mar", passenger: 80, cargo: 55 },
  { month: "Apr", passenger: 71, cargo: 48 },
  { month: "May", passenger: 56, cargo: 51 },
  { month: "Jun", passenger: 89, cargo: 60 },
];

interface Booking {
  id?: string;
  vehicle: string;
  driver: string;
  status: string;
  approver1: string;
  approver2: string;
  startDate: string;
  endDate: string;
  timestamp: string;
}

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [bookings, setBookings] = useState<Booking[]>([]);

  const router = useRouter();

  const cookies = parseCookies();
  console.log("cookies", cookies);

  const handleLogout = () => {
    nookies.destroy(null, "authToken");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const [booking, setBooking] = useState<Booking>({
    vehicle: "",
    driver: "",
    status: "Pending",
    approver1: "",
    approver2: "",
    startDate: "",
    endDate: "",
    timestamp: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newBooking = {
      ...booking,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/bookings",
        newBooking
      );
      toast.success("Booking submitted successfully!");
      console.log("Booking submitted successfully!", response.data);

      setBooking({
        vehicle: "",
        driver: "",
        status: "",
        approver1: "",
        approver2: "",
        startDate: "",
        endDate: "",
        timestamp: "",
      });

      setActiveTab("dashboard");
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error("Error submitting booking!");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const getUser = localStorage.getItem("user");

  const user = getUser ? JSON.parse(getUser) : {};

  console.log("user", user);

  const getBookings = async () => {
    try {
      const response = await axios.get("http://localhost:8000/bookings");
      console.log("Bookings:", response.data);
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    getBookings();
  }, [bookings]);

  const sortedBookings = bookings.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Main Content Area */}
        <main className="p-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between space-x-2 bg-white p-6 rounded-lg shadow">
                <div>
                  <h2 className="text-lg font-semibold">
                    {user.username || ""}
                  </h2>
                  <p className="text-gray-500">{user.role || ""}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center p-2 rounded-lg hover:bg-gray-100"
                >
                  <LogOut size={20} />
                </button>
              </div>

              {user.role === "admin" && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <ToastContainer />
                  <h2 className="text-2xl font-bold mb-4">Book a Vehicle</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="vehicle" className="block mb-1">
                        Vehicle
                      </label>
                      <select
                        id="vehicle"
                        name="vehicle"
                        value={booking.vehicle}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                      >
                        <option value="">Select a vehicle</option>
                        <option value="car">Car</option>
                        <option value="truck">Truck</option>
                        <option value="van">Van</option>
                        <option value="bus">Bus</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="driver" className="block mb-1">
                        Driver
                      </label>
                      <select
                        id="driver"
                        name="driver"
                        value={booking.driver}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                      >
                        <option value="">Select driver</option>
                        <option value="driver-1">Driver 1</option>
                        <option value="driver-2">Driver 2</option>
                        <option value="driver-3">Driver 3</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="approver1" className="block mb-1">
                        First Approver
                      </label>
                      <select
                        id="approver1"
                        name="approver1"
                        value={booking.approver1}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                      >
                        <option value="">Select approver</option>
                        <option value="approver-1">Approver 1</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="approver2" className="block mb-1">
                        Second Approver
                      </label>
                      <select
                        id="approver2"
                        name="approver2"
                        value={booking.approver2}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                      >
                        <option value="">Select approver</option>
                        <option value="approver-2">Approver 2</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="startDate" className="block mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={booking.startDate}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label htmlFor="endDate" className="block mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={booking.endDate}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                      Submit Booking
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-gray-500 text-sm">Total Bookings</h3>
                  <p className="text-2xl font-bold mt-2">{bookings.length}</p>
                  <span className="text-green-500 text-sm">
                    ↑ ...% from last month
                  </span>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-gray-500 text-sm">Active Vehicles</h3>
                  <p className="text-2xl font-bold mt-2">4</p>
                  <span className="text-blue-500 text-sm">
                    Car, Truck, Van, Bus
                  </span>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-gray-500 text-sm">Pending Approvals</h3>
                  <p className="text-2xl font-bold mt-2">
                    {
                      bookings.filter((booking) => booking.status === "Pending")
                        .length
                    }
                  </p>
                  <span className="text-yellow-500 text-sm">
                    Requires attention
                  </span>
                </div>
              </div>

              {/* Vehicle Usage Chart */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">
                  Vehicle Usage Trends
                </h3>
                <div style={{ width: "100%", height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={vehicleUsageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="passenger"
                        name="Passenger Vehicles"
                        fill="#4F46E5"
                      />
                      <Bar
                        dataKey="cargo"
                        name="Cargo Vehicles"
                        fill="#10B981"
                      />
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Vehicle
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Driver
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Start Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          End Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Timestamp
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.length > 0 ? (
                        sortedBookings.map((booking) => (
                          <tr key={booking.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {booking.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {booking.vehicle}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {booking.driver}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  booking.status === "Approved"
                                    ? "bg-green-100 text-green-800"
                                    : booking.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {new Date(booking.startDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {new Date(booking.endDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {booking.timestamp}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 text-center">
                            No recent bookings
                          </td>
                        </tr>
                      )}
                    </tbody>

                    {/* <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">#12345</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          Toyota Innova
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          John Doe
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Approved
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          2024-01-02
                        </td>
                      </tr>
                    </tbody> */}
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "vehicles" && (
            <div className="space-y-6">
              {/* Vehicle List */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold">Vehicle List</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Vehicle ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Make
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Model
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Year
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">V001</td>
                        <td className="px-6 py-4 whitespace-nowrap">Toyota</td>
                        <td className="px-6 py-4 whitespace-nowrap">Innova</td>
                        <td className="px-6 py-4 whitespace-nowrap">2022</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Available
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "bookings" && (
            <div className="space-y-6">
              {/* Booking List */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold">Booking List</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Booking ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Vehicle
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Driver
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">#12345</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          Toyota Innova
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          John Doe
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Approved
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          2024-01-02
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "approvals" && (
            <div className="space-y-6">
              {/* Approval Requests */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold">Approval Requests</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Vehicle
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Driver
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">#12345</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          Toyota Innova
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          John Doe
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          2024-01-02
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
