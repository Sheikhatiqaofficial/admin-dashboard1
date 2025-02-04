
// "use client";

// import React, { useEffect, useState } from "react";
// import { client } from "@/sanity/lib/client";
// import Image from "next/image";
// import { urlFor } from "@/sanity/lib/image";
// import Swal from "sweetalert2";
// import ProtectedRoute from "@/app/components/protected/ProtectedRoute";


// interface Order {
//     _id: string;
//     firstName: string;
//     lastName: string;
//     phone: string;
//     email: string;
//     address: string;
//     city: string;
//     zipCode: string;
//     total: number;
//     discount: number;
//     orderDate: string;
//     status: string | null;
//     cartItems: { name: string; image: string }[];
// }

// export default function AdminDashboard() {
//     const [orders, setOrders] = useState<Order[]>([]);
//     const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
//     const [filter, setFilter] = useState("All");
  
//     useEffect(() => {
//       console.log("Fetching orders...");
//       client
//         .fetch(
//           `*[_type == "order"]{
//             _id,
//             firstName,
//             lastName,
//             phone,
//             email,
//             address,
//             city,
//             zipCode,
//             total,
//             discount,
//             orderDate,
//             status,
//             "cartItems": cartItems[]->{ name, image }
//           }`
//         )
//         .then((data) => {
//           console.log("Fetched orders:", data);
//           setOrders(data);
//         })
//         .catch((error) => console.error("Error fetching orders:", error));
//     }, []);
  
//     const filteredOrders =
//       filter === "All" ? orders : orders.filter((order) => order.status === filter);
  
//     const toggleOrderDetails = (orderId: string) => {
//       setSelectedOrderId((prev) => (prev === orderId ? null : orderId));
//     };
  
//     const handleDelete = async (orderId: string) => {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#d33",
//         cancelButtonColor: "#3085d6",
//         confirmButtonText: "Yes, delete it!",
//       });
  
//       if (!result.isConfirmed) return;
  
//       try {
//         await client.delete(orderId);
//         setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
//         Swal.fire("Deleted!", "Your order has been deleted.", "success");
//       } catch (error) {
//         console.error("Error deleting order:", error);
//         Swal.fire("Error!", "Something went wrong while deleting.", "error");
//       }
//     };
  
//     const handleStatusChange = async (orderId: string, newStatus: string) => {
//       try {
//         await client.patch(orderId).set({ status: newStatus }).commit();
//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order._id === orderId ? { ...order, status: newStatus } : order
//           )
//         );
//         if (newStatus === "dispatch") {
//           Swal.fire("Dispatch", "The order is now dispatched.", "success");
//         } else if (newStatus === "success") {
//           Swal.fire("Success", "The order has been completed.", "success");
//         }
//       } catch (error) {
//         console.error("Error updating order status:", error);
//         Swal.fire("Error!", "Something went wrong while updating the status.", "error");
//       }
//     };
  
//     return (
//       <ProtectedRoute>
//         <div className="flex flex-col h-screen bg-gray-100">
//           {/* Navbar */}
//           <nav className="bg-red-600 text-white p-4 shadow-lg flex justify-between">
//             <h2 className="text-2xl font-bold">Admin Dashboard</h2>
//             <div className="flex space-x-4">
//               {["All", "pending", "dispatch", "success"].map((status) => (
//                 <button
//                   key={status}
//                   className={`px-4 py-2 rounded-lg transition-all ${
//                     filter === status ? "bg-white text-red-600 font-bold" : "text-white"
//                   }`}
//                   onClick={() => setFilter(status)}
//                 >
//                   {status.charAt(0).toUpperCase() + status.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </nav>
  
//           {/* Orders Table */}
//           <div className="flex-1 p-6 overflow-y-auto">
//             <h2 className="text-2xl font-bold mb-4 text-center">Orders</h2>
//             <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//               <table className="min-w-full divide-y divide-gray-200 text-sm lg:text-base">
//                 <thead className="bg-gray-50 text-red-600">
//                   <tr>
//                     <th>ID</th>
//                     <th>Customer</th>
//                     <th>Address</th>
//                     <th>Date</th>
//                     <th>Total</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {filteredOrders.map((order) => (
//                     <React.Fragment key={order._id}>
//                       <tr
//                         className="cursor-pointer hover:bg-red-100 transition-all"
//                         onClick={() => toggleOrderDetails(order._id)}
//                       >
//                         <td>{order._id}</td>
//                         <td>{order.firstName} {order.lastName}</td>
//                         <td>{order.address}</td>
//                         <td>{new Date(order.orderDate).toLocaleDateString()}</td>
//                         <td>${order.total}</td>
//                         <td>
//                           <select
//                             value={order.status || ""}
//                             onChange={(e) => handleStatusChange(order._id, e.target.value)}
//                             className="bg-gray-100 p-1 rounded"
//                           >
//                             <option value="pending">Pending</option>
//                             <option value="dispatch">Dispatch</option>
//                             <option value="success">Completed</option>
//                           </select>
//                         </td>
//                         <td className="px-6 py-4">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDelete(order._id);
//                             }}
//                             className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                       {selectedOrderId === order._id && (
//                         <tr>
//                           <td colSpan={7} className="bg-gray-50 p-4 transition-all animate-fadeIn">
//                             <h3 className="font-bold">Order Details</h3>
//                             <p><strong>Phone:</strong> {order.phone}</p>
//                             <p><strong>Email:</strong> {order.email}</p>
//                             <p><strong>City:</strong> {order.city}</p>
//                             <ul>
//                               {order.cartItems.map((item, index) => (
//                                 <li key={`${order._id}-${index}`} className="flex items-center gap-2">
//                                   {item.name}
//                                   {item.image && (
//                                     <Image
//                                       src={urlFor(item.image).width(200).height(200).url()}
//                                       width={40}
//                                       height={40}
//                                       alt={item.name}
//                                       onError={(e) => {
//                                         console.error("Error loading image:", e);
//                                         e.currentTarget.src = "/fallback-image.png";
//                                       }}
//                                     />
//                                   )}
//                                 </li>
//                               ))}
//                             </ul>
//                           </td>
//                         </tr>
//                       )}
//                     </React.Fragment>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </ProtectedRoute>
//     );
//   }
"use client";

import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Swal from "sweetalert2";
import ProtectedRoute from "@/app/components/protected/ProtectedRoute";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  total: number;
  discount: number;
  orderDate: string;
  status: string | null;
  cartItems: { name: string; image: string }[] | null;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    console.log("Fetching orders...");
    client
      .fetch(
        `*[_type == "order"]{
          _id,
          firstName,
          lastName,
          phone,
          email,
          address,
          city,
          zipCode,
          total,
          discount,
          orderDate,
          status,
          "cartItems": cartItems[]->{ name, image }
        }`
      )
      .then((data) => {
        console.log("Fetched orders:", data);
        setOrders(data);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const filteredOrders =
    filter === "All" ? orders : orders.filter((order) => order.status === filter);

  const toggleOrderDetails = (orderId: string) => {
    setSelectedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const handleDelete = async (orderId: string) => {
    const result = await Swal.fire({
      title: "Do you confirm?",
      text: "This can't be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "delete",
    });

    if (!result.isConfirmed) return;

    try {
      await client.delete(orderId);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      Swal.fire("Deleted!", "Your order has been deleted.", "success");
    } catch (error) {
      console.error("Error deleting order:", error);
      Swal.fire("Error!", "Something went wrong while deleting.", "error");
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await client.patch(orderId).set({ status: newStatus }).commit();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      if (newStatus === "dispatch") {
        Swal.fire("Dispatch", "The order is now dispatched.", "success");
      } else if (newStatus === "success") {
        Swal.fire("Success", "The order has been completed.", "success");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      Swal.fire("Error!", "Something went wrong while updating the status.", "error");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    signOut({ redirect: false }); // Prevent redirection after sign-out
    router.push("/admin"); // Redirect to the login page
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6 shadow-md flex justify-between items-center">
          <h2 className="text-3xl font-semibold">Admin Dashboard</h2>
          <div className="flex space-x-6">
            {["All", "pending", "dispatch", "success"].map((status) => (
              <button
                key={status}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  filter === status
                    ? "bg-white text-indigo-800"
                    : "bg-transparent text-white hover:bg-indigo-600"
                }`}
                onClick={() => setFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
            <button
              onClick={handleSignOut}
              className="px-6 py-3 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </div>
        </nav>

        {/* Orders Table */}
        <div className="flex-1 p-8 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-indigo-800">Orders</h2>
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col lg:flex-row items-start justify-between hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-8">
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-700">{order.firstName} {order.lastName}</h3>
                    <p className="text-sm text-gray-600">{new Date(order.orderDate).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">{order.address}</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-indigo-600">${order.total}</p>
                    <select
                      value={order.status ?? "pending"}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="bg-gray-200 p-2 rounded-md text-sm font-medium mt-2"
                    >
                      <option value="pending">Pending</option>
                      <option value="dispatch">Dispatch</option>
                      <option value="success">Completed</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 lg:mt-0 flex space-x-4">
                  <button
                    onClick={() => toggleOrderDetails(order._id)}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
                {selectedOrderId === order._id && (
                  <div className="mt-4 space-y-4">
                    <h4 className="text-lg font-semibold text-indigo-700">Order Details</h4>
                    <p><strong>Phone:</strong> {order.phone}</p>
                    <p><strong>Email:</strong> {order.email}</p>
                    <p><strong>City:</strong> {order.city}</p>
                    <div>
                      <strong>Cart Items:</strong>
                      <ul className="space-y-2 mt-2">
                        {order.cartItems?.map((item, index) => (
                          <li key={`${order._id}-${index}`} className="flex items-center gap-3">
                            {item.name}
                            {item.image && (
                              <Image
                                src={urlFor(item.image).width(50).height(50).url()}
                                width={40}
                                height={40}
                                alt={item.name}
                                onError={(e) => {
                                  e.currentTarget.src = "/fallback-image.png";
                                }}
                                className="rounded-full"
                              />
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
