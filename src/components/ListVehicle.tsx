import axios from "axios";
import React, { useEffect, useState } from "react";

interface Vehicle {
  id: string;
  model: string;
  year: string;
  available: boolean;
}

export default function ListVehicle() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const getVehicles = async () => {
    try {
      const response = await axios.get("http://localhost:8000/vehicles");
      return response.data;
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      const vehicles = await getVehicles();
      setVehicles(vehicles);
    };

    fetchVehicles();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vehicle ID
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
          {vehicles.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center">
                Loading vehicles...
              </td>
            </tr>
          ) : (
            vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td className="px-6 py-4 whitespace-nowrap">{vehicle.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{vehicle.model}</td>
                <td className="px-6 py-4 whitespace-nowrap">{vehicle.year}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      vehicle.available
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {vehicle.available ? "Available" : "Not Available"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
