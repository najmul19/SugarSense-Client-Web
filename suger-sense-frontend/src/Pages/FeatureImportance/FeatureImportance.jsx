import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import AOS from "aos";
import "aos/dist/aos.css";
import useAxiosSecure from "../../api/Hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const FeatureImportance = () => {
  const axiosSecure = useAxiosSecure();

  // Initialize animation on scroll
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Fetch feature importance data from backend
  const { data, isLoading, isError } = useQuery({
    queryKey: ["feature-importance"],
    queryFn: async () => {
      const res = await axiosSecure.get("/feature-importance");
      return res.data.data; // ensure it's an array
    },
  });

  if (isLoading) return <LoadingSpinner text="Loading Feature Improtance"></LoadingSpinner>
  if (isError)
    return <p className="text-center py-10 text-red-500">Error loading data</p>;

  // Sort features by importance descending and take top 10
  const sortedData = [...(data || [])]
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 10);

  return (
    <div className="min-h-screen  p-6 md:p-10 lg:p-16">
      {/* Title */}
      <h1
        className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800"
        data-aos="fade-down"
      >
        Feature Importance Analysis
      </h1>

      {/* Bar Chart Section */}
      <div className="card-bg-n shadow-lg rounded-2xl p-6" data-aos="fade-up">
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            layout="vertical"
            data={sortedData}
            margin={{ top: 20, right: 40, left: 100, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="feature" width={150} />
            <Tooltip />
            <Bar dataKey="importance" fill="#4f46e5" radius={[5, 5, 5, 5]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Description */}
      <p
        className="mt-6 text-gray-600 text-center max-w-3xl mx-auto"
        data-aos="fade-up"
      >
        This graph shows the top 10 most important features in predicting
        diabetes. Features with higher importance have more impact on the
        model’s decisions, helping identify which health indicators matter most.
      </p>

      {/* Analysis Summary Section */}
      <div
        className="mt-10 bg-white shadow-md rounded-2xl p-6 max-w-4xl mx-auto"
        data-aos="fade-up"
      >
        <h2 className="text-2xl font-semibold text-center mb-4 text-indigo-600">
          Analysis Summary
        </h2>
        <ul className="text-gray-700 space-y-3">
          <li>
            🔹 <b>Top Feature:</b> {sortedData[0]?.feature} — contributes most
            to model accuracy.
          </li>
          <li>
            🔹 <b>Balanced Importance:</b> Features ranked 2–5 have moderate but
            significant influence.
          </li>
          <li>
            🔹 <b>Low Impact Features:</b> Lower-ranked ones have smaller
            contributions, but may still support combined predictions.
          </li>
          <li>
            🔹 <b>Use Case:</b> Doctors or analysts can focus on top-ranked
            features for early diabetes risk detection and patient awareness.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FeatureImportance;
