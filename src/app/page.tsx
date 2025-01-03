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
  Legend,
} from "recharts";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import nookies from "nookies";
import { parseCookies } from "nookies";
import axios from "axios";
import Bookings from "@/components/ListBooking";
import { Booking } from "@/types";
import ListBooking from "@/components/ListBooking";
import FormBooking from "@/components/FormBooking";
import ListVehicle from "@/components/ListVehicle";

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
  //   vehicle: "",
  //   driver: "",
  //   status: "Pending",
  //   approver1: "",
  //   approver2: "",
  //   startDate: "",
  //   endDate: "",
  //   timestamp: "",
  // });

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const newBooking = {
  //     ...booking,
  //     timestamp: new Date().toISOString(),
  //   };

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/bookings",
  //       newBooking
  //     );
  //     toast.success("Booking submitted successfully!");
  //     console.log("Booking submitted successfully!", response.data);

  //     setBooking({
  //       vehicle: "",
  //       driver: "",
  //       status: "",
  //       approver1: "",
  //       approver2: "",
  //       startDate: "",
  //       endDate: "",
  //       timestamp: "",
  //     });

  //     setActiveTab("dashboard");
  //   } catch (error) {
  //     console.error("Error submitting booking:", error);
  //     toast.error("Error submitting booking!");
  //   }
  // };

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   setBooking({ ...booking, [e.target.name]: e.target.value });
  // };

  const getUser = localStorage.getItem("user");

  const user = getUser ? JSON.parse(getUser) : {};

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

  const processBookingData = (bookings: Booking[]) => {
    const dataMap: { [key: string]: { [key: string]: number } } = {};

    bookings.forEach((booking) => {
      const month = new Date(booking.startDate).toLocaleString("default", {
        month: "short",
      });
      const vehicle = booking.vehicle;

      if (!dataMap[month]) {
        dataMap[month] = {};
      }
      if (!dataMap[month][vehicle]) {
        dataMap[month][vehicle] = 0;
      }

      dataMap[month][vehicle] += 1;
    });

    // Konversi dataMap ke dalam format array yang dibutuhkan Recharts
    return Object.entries(dataMap).map(([month, vehicles]) => ({
      month,
      ...vehicles,
    }));
  };

  const chartData = processBookingData(bookings);

  // Daftar warna untuk setiap jenis kendaraan
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

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
                <FormBooking setActiveTab={setActiveTab} />
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
                  Vehicle Bookings by Month
                </h3>
                <div style={{ width: "100%", height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barSize={100}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {Object.keys(chartData[0] || {})
                        .filter((key) => key !== "month")
                        .map((key, index) => (
                          <Bar
                            key={key}
                            dataKey={key}
                            name={key}
                            fill={colors[index % colors.length]}
                          />
                        ))}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold">Recent Bookings</h3>
                </div>
                <Bookings bookings={bookings} limit={5} />
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
                <ListVehicle />
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
                <ListBooking bookings={bookings} />
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
                <ListBooking
                  bookings={bookings}
                  status="Pending"
                  userRole={user.role}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
