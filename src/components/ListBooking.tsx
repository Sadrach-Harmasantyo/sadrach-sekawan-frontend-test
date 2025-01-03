import { Booking } from "@/types";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

type ListBookingProps = {
  bookings: Booking[];
  limit?: number;
  status?: string;
  userRole?: string;
};

export default function ListBooking({
  bookings,
  limit,
  status,
  userRole,
}: ListBookingProps) {
  const sortedBookings = bookings.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const recentBookings = sortedBookings.slice(0, limit);

  if (status) {
    recentBookings.filter((booking) => booking.status === status);
  }

  const handleStatusChange = async (
    id: string | undefined,
    newStatus: string
  ) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/bookings/${id}`,
        {
          status: newStatus,
        }
      );
      toast.success("Status updated successfully!");
      console.log("Updated booking:", response.data);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };

  return (
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
            recentBookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap">{booking.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.vehicle}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.driver}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {userRole === "approver" ? (
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(booking.id, e.target.value)
                      }
                      className="border rounded p-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                    </select>
                  ) : (
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
                  )}
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
      </table>
    </div>
  );
}
