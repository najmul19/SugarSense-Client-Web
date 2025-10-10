import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useAuth from "../../api/Hooks/useAuth";
import useAxiosSecure from "../../api/Hooks/useAxiosSecure";
import "../../globals.css";
import { FaListAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import CustomButton from "../../Shared/Buttons/CustomButton";

import LoadingSpinner from "../../Shared/LoadingSpinner";
import axios from "axios";
import DialogBox from "../../Shared/DialogBox/DialogBox";
import AlertBox from "../../components/AlertBox";

const History = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: "ease-in-out",
    });
    AOS.refresh();
  }, []);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    body: "",
    color: "blue",
  });

  const {
    data: predictions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userPredictions", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/predictions?email=${user.email}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/predictions/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["userPredictions", user.email]);
      setAlert({
        isOpen: true,
        title: "Deleted!",
        body: "Prediction deleted successfully.",
        color: "green",
      });
      setShowDialog(false);
    },
    onError: () => {
      setAlert({
        isOpen: true,
        title: "Error",
        body: "Failed to delete prediction.",
        color: "red",
      });
    },
  });

  const openDeleteDialog = (prediction) => {
    setSelectedPrediction(prediction);
    setShowDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedPrediction?._id) {
      deleteMutation.mutate(selectedPrediction._id);
    }
  };

  const handleCancel = () => {
    setSelectedPrediction(null);
    setShowDialog(false);
  };

  if (isLoading) {
    return (
      <LoadingSpinner text="Loading your prediction history..."></LoadingSpinner>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10" data-aos="fade-down">
        Failed to load prediction history.
      </div>
    );
  }

  if (!predictions.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-gray-500">
        <p data-aos="zoom-in">You haven't made any predictions yet.</p>
        <Link data-aos="zoom-out" to="/predict" className="inline-block mt-3">
          <CustomButton text="Make your first prediction →" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 mt-10" data-aos="fade-up">
      {/* Header */}
      <h2
        className="text-3xl font-bold text-center mb-4 text-blue-700 flex justify-center items-center gap-2"
        data-aos="fade-down"
      >
        <FaListAlt className="text-2xl text-blue-600" />
        Your Prediction History
      </h2>

      <div
        className="rounded-lg shadow border border-gray-200 overflow-x-auto"
        data-aos="fade-up"
      >
        {/* Desktop Table */}
        <table className="hidden md:table w-full text-sm border-collapse">
          <thead className="bg-[#3b5998] text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Inputs</th>
              <th className="py-3 px-4 text-left">Result</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((p, index) => (
              <tr
                key={p._id}
                className="border-b hover:bg-gray-50 transition"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {Object.entries(p)
                    .filter(
                      ([key]) =>
                        !["prediction", "email", "createdAt", "_id"].includes(
                          key
                        )
                    )
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(", ")}
                </td>
                <td
                  className={`py-3 px-4 font-semibold ${
                    p.prediction === "Diabetic"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {p.prediction}
                </td>
                <td className="py-3 px-4 text-gray-500">
                  {new Date(p.createdAt).toLocaleString()}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => openDeleteDialog(p)}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-900 cursor-pointer transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y">
          {predictions.map((p, index) => (
            <div
              key={p._id}
              className="p-4"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-600">
                  #{index + 1}
                </span>
                <span
                  className={`font-semibold ${
                    p.prediction === "Diabetic"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {p.prediction}
                </span>
              </div>

              <div className="text-sm text-gray-700 mb-2">
                <span className="font-medium text-gray-600">Inputs: </span>
                {Object.entries(p)
                  .filter(
                    ([key]) =>
                      !["prediction", "email", "createdAt", "_id"].includes(key)
                  )
                  .map(([key, value]) => (
                    <div key={key}>
                      <span className="capitalize">{key}</span>: {value}
                    </div>
                  ))}
              </div>

              <div className="flex justify-between items-center mt-2">
                <div className="text-xs text-gray-500">
                  {new Date(p.createdAt).toLocaleString()}
                </div>
                <button
                  onClick={() => openDeleteDialog(p)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    
      <DialogBox
        isOpen={showDialog}
        title="Delete Prediction"
        body="Are you sure you want to delete this prediction? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancel}
      />

      {/* {deleteMutation.isLoading && <LoadingSpinner text="Deleting..." />} */}
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

export default History;
