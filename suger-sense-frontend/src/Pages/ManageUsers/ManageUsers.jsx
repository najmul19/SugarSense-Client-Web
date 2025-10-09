import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaUserShield, FaUser, FaEnvelope } from "react-icons/fa";
import useAxiosSecure from "../../api/Hooks/useAxiosSecure";
import useAuth from "../../api/Hooks/useAuth";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [updatingUserId, setUpdatingUserId] = useState(null);

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ id, role }) => {
      return await axiosSecure.patch(`/users/${id}/role`, { role });
    },
    onMutate: ({ id }) => setUpdatingUserId(id),
    onSettled: () => {
      setUpdatingUserId(null);
      queryClient.invalidateQueries(["allUsers"]);
    },
  });

  const updateRole = ({ id, role }) => mutation.mutate({ id, role });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-blue-600">
        Loading users...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10 text-lg font-medium">
        ❌ Failed to load users.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2
        className="text-3xl font-bold text-center mb-4 text-blue-700 flex justify-center items-center gap-2"
        data-aos="fade-down"
      >
        <FaUserShield className="text-blue-600" />
        Manage Users
      </h2>

      <div
        className=" rounded-lg shadow border border-gray-200 overflow-x-auto"
        data-aos="fade-up"
      >
        {/* Table for medium+ screens */}
        <table className="hidden md:table w-full text-sm border-collapse">
          <thead className="bg-[#3b5998] text-white">
            <tr>
              <th className="py-3 px-4 text-left w-12">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, index) => (
              <tr
                key={u._id}
                className="border-b hover:bg-blue-50 transition duration-200"
              >
                <td className="py-3 px-4 font-medium">{index + 1}</td>
                <td className="py-3 px-4 flex items-center gap-2 text-gray-800">
                  <FaUser className="text-[#3b5998]" />
                  {u.name || "Unknown"}
                </td>
                <td className="py-3 px-4 text-gray-700 break-all">
                  <FaEnvelope className="inline mr-2 text-gray-400" />
                  {u.email}
                </td>
                <td className="py-3 px-4 font-medium">
                  {u.role === "admin" ? (
                    <span className="flex items-center gap-1 text-green-600">
                      <FaUserShield /> Admin
                    </span>
                  ) : (
                    <span className="text-gray-600 flex items-center gap-1">
                      <FaUser /> User
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-center">
                  {user?.email === u.email ? (
                    <span className="text-gray-400 italic text-sm">(You)</span>
                  ) : (
                    <button
                      disabled={updatingUserId === u._id}
                      onClick={() =>
                        updateRole({
                          id: u._id,
                          role: u.role === "admin" ? "user" : "admin",
                        })
                      }
                      className={`px-4 py-1.5 rounded-md text-white font-medium transition ${
                        updatingUserId === u._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : u.role === "admin"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {updatingUserId === u._id
                        ? "Updating..."
                        : u.role === "admin"
                        ? "Demote"
                        : "Promote"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Card layout for small screens */}
        <div className="md:hidden divide-y">
          {users.map((u, index) => (
            <div key={u._id} className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-500">
                  #{index + 1}
                </span>
                {user?.email === u.email && (
                  <span className="text-gray-400 italic text-xs">(You)</span>
                )}
              </div>

              <div className="flex items-center gap-2 mb-1">
                <FaUser className="text-[#3b5998]" />
                <span className="font-medium">{u.name || "Unknown"}</span>
              </div>

              <div className="flex items-center gap-2 mb-1 text-sm text-gray-700">
                <FaEnvelope className="text-gray-400" />
                {u.email}
              </div>

              <div className="flex items-center gap-2 mb-2">
                {u.role === "admin" ? (
                  <span className="flex items-center gap-1 text-green-600">
                    <FaUserShield /> Admin
                  </span>
                ) : (
                  <span className="text-gray-600 flex items-center gap-1">
                    <FaUser /> User
                  </span>
                )}
              </div>

              <button
                disabled={updatingUserId === u._id}
                onClick={() =>
                  updateRole({
                    id: u._id,
                    role: u.role === "admin" ? "user" : "admin",
                  })
                }
                className={`w-full py-2 rounded-md text-white font-medium transition ${
                  updatingUserId === u._id
                    ? "bg-gray-400 cursor-not-allowed"
                    : u.role === "admin"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {updatingUserId === u._id
                  ? "Updating..."
                  : u.role === "admin"
                  ? "Demote"
                  : "Promote"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
