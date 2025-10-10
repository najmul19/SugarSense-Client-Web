import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../api/Hooks/useAxiosSecure";
import useAuth from "../../../api/Hooks/useAuth";
import axios from "axios";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import AlertBox from "../../../components/AlertBox";
import DialogBox from "../../../Shared/DialogBox/DialogBox";
import { FaUserCircle } from "react-icons/fa";
import axiosInstance from "../../../api/axiosInstance";


const AllFeedback = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = axiosInstance
  const queryClient = useQueryClient();

  const [alert, setAlert] = useState({ isOpen: false, title: "", body: "", color: "blue" });
  const [deleteId, setDeleteId] = useState(null); 
  const [dialogOpen, setDialogOpen] = useState(false);

 
  const { data: feedbacks = [], isLoading: feedbackLoading } = useQuery({
    queryKey: ["allFeedback"],
    queryFn: async () => (await axiosPublic.get("/feedback")).data,
  });


  const { data: myData, isLoading: roleLoading } = useQuery({
    queryKey: ["user-data", user?.email],
    queryFn: async () => (await axiosSecure.get(`/users/${user.email}`)).data,
    enabled: !!user?.email,
  });

 
  const deleteMutation = useMutation({
    mutationFn: async (id) =>
      await axiosSecure.delete(`/feedback/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["allFeedback"]);
      setAlert({ isOpen: true, title: "Deleted!", body: "Feedback deleted successfully.", color: "green" });
      setDialogOpen(false);
    },
    onError: () => setAlert({ isOpen: true, title: "Error", body: "Failed to delete feedback.", color: "red" }),
  });

  const confirmDelete = (id) => {
    setDeleteId(id);
    setDialogOpen(true);
  };

  const handleDelete = () => {
    if (deleteId) deleteMutation.mutate(deleteId);
  };

  if (feedbackLoading || roleLoading) return <LoadingSpinner text="Loading feedback..." />;

  return (
    <div className="max-w-4xl mx-auto p-6 card-bg-n rounded-xl shadow text-gray-800" data-aos="fade-up">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-700 flex justify-center items-center gap-2"
          data-aos="fade-down">
            <FaUserCircle className="text-2xl text-blue-600"></FaUserCircle>
            All Feedback</h1>

      {feedbacks.length ? (
        feedbacks.map((fb) => (
          <div
            key={fb._id}
            className="border-b py-3 flex flex-col md:flex-row md:justify-between md:items-center"
          >
            <div>
              <p className="font-semibold text-teal-600">{fb.name}</p>
              {/* <p className="text-gray-600 text-sm">{fb.email}</p> */}
              <p className="text-gray-700">{fb.message}</p>
              <p className="text-xs text-gray-400">{new Date(fb.createdAt).toLocaleString()}</p>
            </div>

            {myData?.role === "admin" && (
              <button
                onClick={() => confirmDelete(fb._id)}
                className="mt-2 md:mt-0 bg-red-600 hover:bg-amber-800 cursor-pointer text-white px-4 py-1 rounded-md transition"
              >
                Delete
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No feedback yet.</p>
      )}

     
      {alert.isOpen && (
        <AlertBox
          isOpen={alert.isOpen}
          title={alert.title}
          body={alert.body}
          color={alert.color}
          onClose={() => setAlert({ ...alert, isOpen: false })}
        />
      )}

    
      <DialogBox
        isOpen={dialogOpen}
        title="Confirm Delete"
        body="Are you sure you want to delete this feedback?"
        onConfirm={handleDelete}
        onCancel={() => setDialogOpen(false)}
      />
    </div>
  );
};

export default AllFeedback;
