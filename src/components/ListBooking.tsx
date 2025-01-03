import { Booking } from "@/types";
import axios from "axios";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

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

  const handleApproverApproval = async (
    id: string | undefined,
    approver: "approver1" | "approver2",
    isApproved: boolean
  ) => {
    try {
      const patchData =
        approver === "approver1"
          ? { approver1Approved: isApproved }
          : { approver2Approved: isApproved };

      const response = await axios.patch(
        `http://localhost:8000/bookings/${id}`,
        patchData
      );

      const updatedBooking = response.data;

      // Jika kedua approver menyetujui, update status menjadi "Approved"
      if (
        updatedBooking.approver1Approved &&
        updatedBooking.approver2Approved
      ) {
        await axios.patch(`http://localhost:8000/bookings/${id}`, {
          status: "Approved",
        });
        toast.success("Booking approved by both approvers!");
      } else if (
        updatedBooking.approver1Approved ||
        updatedBooking.approver2Approved
      ) {
        // Jika hanya satu approver menyetujui, update status menjadi "Pending"
        await axios.patch(`http://localhost:8000/bookings/${id}`, {
          status: "Pending",
        });
        toast.success(`Approval updated by ${approver}`);
      }
    } catch (error) {
      console.error("Error updating approval:", error);
      toast.error("Failed to update approval.");
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="overflow-x-auto">
      <ToastContainer />
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
                  {userRole === "approver1" ? (
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          checked={booking.approver1Approved}
                          onChange={(e) =>
                            handleApproverApproval(
                              booking.id,
                              "approver1",
                              e.target.checked
                            )
                          }
                        />
                        Approver 1
                      </label>
                    </div>
                  ) : userRole === "approver2" ? (
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          checked={booking.approver2Approved}
                          onChange={(e) =>
                            handleApproverApproval(
                              booking.id,
                              "approver2",
                              e.target.checked
                            )
                          }
                        />
                        Approver 2
                      </label>
                    </div>
                  ) : (
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
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
