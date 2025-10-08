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

  const { data: users = [], isLoading, isError } = useQuery({
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
        className="flex items-center justify-center gap-2 text-2xl md:text-3xl font-bold text-blue-700 mb-10"
        data-aos="fade-down"
      >
        <FaUserShield className="text-[#3b5998] text-3xl" />
        Manage Users
      </h2>

      <div
        className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200"
        data-aos="fade-up"
      >
        <table className="min-w-full text-sm md:text-base border-collapse">
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
                <td className="py-3 px-4 font-medium text-gray-700">
                  {index + 1}
                </td>

                <td className="py-3 px-4 flex items-center gap-2 text-gray-800 whitespace-nowrap">
                  <FaUser className="text-[#3b5998] shrink-0" />
                  <span>{u.name || "Unknown"}</span>
                </td>

                <td className="py-3 px-4 text-gray-700 break-all">
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-gray-400 shrink-0" />
                    <span>{u.email}</span>
                  </div>
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
                    <span className="text-gray-400 italic text-sm">
                      (You)
                    </span>
                  ) : u.role === "admin" ? (
                    <button
                      disabled={updatingUserId === u._id}
                      onClick={() => updateRole({ id: u._id, role: "user" })}
                      className={`px-4 py-1.5 rounded-md text-white font-medium transition ${
                        updatingUserId === u._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      {updatingUserId === u._id ? "Updating..." : "Demote"}
                    </button>
                  ) : (
                    <button
                      disabled={updatingUserId === u._id}
                      onClick={() =>
                        updateRole({ id: u._id, role: "admin" })
                      }
                      className={`px-4 py-1.5 rounded-md text-white font-medium transition ${
                        updatingUserId === u._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {updatingUserId === u._id ? "Updating..." : "Promote"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
