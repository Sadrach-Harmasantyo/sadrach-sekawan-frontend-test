"use client";

import { Booking } from "@/types";
import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function FormBooking({
  setActiveTab,
}: {
  setActiveTab: (value: string) => void;
}) {
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

  return (
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
  );
}
