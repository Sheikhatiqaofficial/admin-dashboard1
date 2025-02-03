// 'use client'
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";


// export default function AdminLogin(){
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")

//     const router = useRouter()

//     const handleLogin = (e:React.FormEvent) => {
//         e.preventDefault()
//     }
//     if(email === "shiekhatika2004@gmail.com"){}
// }
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "shiekhatika2004@gmail.com" && password === "1234") {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/admin/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-2xl w-full sm:w-96"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Admin Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-all duration-200"
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 mb-6 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-all duration-200"
          value={password}
        />
        <button
          type="submit"
          className="w-full p-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}
