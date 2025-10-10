import React, { useEffect, useState } from "react";
import axios from "axios";

import useAxiosSecure from "../../../api/Hooks/useAxiosSecure";
import useAuth from "../../../api/Hooks/useAuth";
import AlertBox from "../../../components/AlertBox";
import LoadingSpinner from "../../../Shared/LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../../Shared/Buttons/CustomButton";
import { useQuery } from "@tanstack/react-query";
import { FaCommentDots } from "react-icons/fa";

const FeedbackForm = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    body: "",
    color: "blue",
  });

  const { data: myData, isLoading } = useQuery({
    queryKey: ["user-data", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  if (isLoading) {
    <LoadingSpinner text="Loading Home content"></LoadingSpinner>;
  }
  useEffect(() => {
    if (!myData) return;

    if (myData.role === "admin") {
      setAlert({
        isOpen: true,
        title: "Access Denied",
        body: "Admins cannot provide feedback.",
        color: "yellow",
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setAlert({
        isOpen: true,
        title: "Warning",
        body: "Please write something before submitting!",
        color: "yellow",
      });
      return;
    }

    const feedbackData = {
      name: user?.displayName || "Anonymous",
      email: user?.email,
      message,
    };

    try {
      setLoading(true);

      await axiosSecure.post("/feedback", feedbackData);

      setAlert({
        isOpen: true,
        title: "Thank you!",
        body: "Your feedback has been submitted.",
        color: "green",
      });

      setMessage("");
    } catch (error) {
      setAlert({
        isOpen: true,
        title: "Error",
        body: "Failed to submit feedback.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-[80vh] flex items-center  justify-center  px-4"
      data-aos="zoom-in"
    >
      <div className="max-w-lg w-full card-bg-n shadow rounded p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-4 text-blue-700 flex justify-center items-center gap-2"
          data-aos="fade-down">
            <FaCommentDots className="text-2xl text-blue-600"></FaCommentDots>
          Share Your Feedback
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              disabled
              className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full px-4 py-2 border rounded bg-gray-100 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your feedback here..."
              rows={5}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-2.5 rounded transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#3b82f6] via-[#2563eb] to-[#1e3a8a] hover:from-[#fafcfd] hover:via-[#eafaf7] hover:to-[#ffe9d6] text-white hover:text-blue-600 cursor-pointer"
            }`}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>

          <a
            href="/myFeedback"
            className="block w-full text-center font-semibold py-2.5 rounded bg-gradient-to-r from-[#b9a46a] via-[#18a41a] to-[#1e8a5d] hover:from-[#fbfdfa] hover:via-[#eafaf7] hover:to-[#ffe9d6] text-white hover:text-blue-600 transition mt-3"
          >
            My Feedback
          </a>
        </form>
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <LoadingSpinner text="Submitting your feedback..." />
        </div>
      )}

      {/* Custom AlertBox */}
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

export default FeedbackForm;
