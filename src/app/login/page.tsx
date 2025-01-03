"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { toast, ToastContainer } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === "admin" && password === "admin") {
      setCookie(null, "authToken", "authenticated", {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      });

      const user = {
        username: "User admin",
        role: "admin",
      };

      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful! Redirecting...");

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else if (username === "approver1" && password === "approver1") {
      setCookie(null, "authToken", "authenticated", {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      });

      const user = {
        username: "User approver 1",
        role: "approver",
      };

      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful! Redirecting...");

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else if (username === "approver2" && password === "approver2") {
      setCookie(null, "authToken", "authenticated", {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/",
      });

      const user = {
        username: "User approver2",
        role: "approver",
      };

      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful! Redirecting...");

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else {
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="bg-white p-5 mb-4 rounded-lg shadow w-full max-w-md mx-auto">
        <h1 className="text-lg text-left font-medium">VehicleMS</h1>
        <h2 className="text-3xl font-bold my-6 text-left">
          Hello, Welcome Back
        </h2>

        <h4 className="text-gray-500 text-left text-sm my-3">
          Login to manage your vehicles
        </h4>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              required
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <input
              required
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
