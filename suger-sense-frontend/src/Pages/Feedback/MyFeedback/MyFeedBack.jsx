import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import useAxiosSecure from "../../../api/Hooks/useAxiosSecure";
import useAuth from "../../../api/Hooks/useAuth";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import DialogBox from "../../../Shared/DialogBox/DialogBox";
import AlertBox from "../../../components/AlertBox";
import { MdFeedback } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa";

const MyFeedback = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    body: "",
    color: "blue",
  });

  const {
    data: myFeedback = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myFeedback", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/feedback?email=${user.email}`
      );
      return response.data;
    },
    enabled: !!user?.email,
  });

  
  const deleteMutation = useMutation({
    mutationFn: async (id) =>
      await axiosSecure.delete(`/feedback/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["myFeedback", user?.email]);
      setShowDialog(false);
      setSelectedFeedback(null);
      setAlert({
        isOpen: true,
        title: "Deleted!",
        body: "Feedback deleted successfully.",
        color: "green",
      });
    },
    onError: () => {
      setAlert({
        isOpen: true,
        title: "Error",
        body: "Failed to delete feedback.",
        color: "red",
      });
    },
  });

  const openDeleteDialog = (feedback) => {
    setSelectedFeedback(feedback);
    setShowDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedFeedback?._id) deleteMutation.mutate(selectedFeedback._id);
  };

  const handleCancel = () => {
    setShowDialog(false);
    setSelectedFeedback(null);
  };

  if (isLoading) return <LoadingSpinner text="Loading your feedback..." />;
  if (isError)
    return (
      <p className="text-center text-red-500 mt-6">
        Failed to load feedback. Please try again later.
      </p>
    );

  return (
    <div
      className="max-w-4xl mx-auto p-6   rounded-xl shadow text-gray-800"
      data-aos="fade-up"
    >
      <h1
        className="text-3xl font-bold text-center mb-4 text-blue-700 flex justify-center items-center gap-2"
        data-aos="fade-down"
      >
        <FaCommentDots className="text-4xl text-blue-600"></FaCommentDots>
        {/* <MdFeedback className="text-2xl text-blue-600"></MdFeedback> */}
        My Feedback
      </h1>

      {myFeedback.length ? (
        myFeedback.map((fb) => (
          <div
            key={fb._id}
            className="border-b py-3 flex flex-col md:flex-row md:justify-between md:items-center"
          >
            <div>
              <p className="font-semibold text-teal-600">{fb.name}</p>
              {/* <p className="text-gray-600 text-sm">{fb.email}</p> */}
              <p className="text-gray-700">{fb.message}</p>
              <p className="text-xs text-gray-400">
                {new Date(fb.createdAt).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => openDeleteDialog(fb)}
              className="mt-2 md:mt-0 bg-red-600 hover:bg-amber-700 text-white px-4 py-1 rounded-md transition cursor-pointer "
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">
          You haven’t given any feedback yet.
        </p>
      )}

      
      <DialogBox
        isOpen={showDialog}
        title="Delete Feedback"
        body="Are you sure you want to delete this feedback? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancel}
      />

      {alert.isOpen && (
        <AlertBox
          isOpen={alert.isOpen}
          title={alert.title}
          body={alert.body}
          color={alert.color}
          onClose={() => setAlert({ ...alert, isOpen: false })}
        />
      )}
    </div>
  );
};

export default MyFeedback;
