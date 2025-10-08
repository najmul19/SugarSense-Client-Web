import React, { useEffect, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["feature-importance"],
    queryFn: async () => {
      const res = await axiosSecure.get("/feature-importance");
      return res.data.data;
    },
  });

  if (isLoading) return <LoadingSpinner text="Loading Feature Importance..." />;
  if (isError)
    return <p className="text-center py-10 text-red-500">Error loading data</p>;

  const sortedData = [...(data || [])]
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 10);

  return (
    <div className="min-h-screen p-6 md:p-10 lg:p-16">
      <h1
        className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800"
        data-aos="fade-down"
      >
        Feature Importance Analysis
      </h1>

      {/* Bar Chart Section */}
      <div className="card-bg-n shadow-lg rounded-2xl p-4" data-aos="fade-up">
        <ResponsiveContainer width="100%" height={isMobile ? 350 : 500}>
          <BarChart
            data={sortedData}
            layout={isMobile ? "horizontal" : "vertical"}
            margin={{
              top: 20,
              right: 30,
              left: isMobile ? 0 : 100,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            {isMobile ? (
              <>
                <XAxis
                  dataKey="feature"
                  tick={{
                    fontSize: 10,
                    angle: -60,
                    textAnchor: "end",
                  }}
                  interval={0}
                  height={100}
                />
                <YAxis />
                <Bar
                  dataKey="importance"
                  fill="#4f46e5"
                  barSize={18}
                  radius={[5, 5, 0, 0]}
                ></Bar>
              </>
            ) : (
              <>
                <XAxis type="number" />
                <YAxis
                  type="category"
                  dataKey="feature"
                  width={150}
                  tick={{ fontSize: 12 }}
                />
                <Bar
                  dataKey="importance"
                  fill="#4f46e5"
                  barSize={30}
                  radius={[5, 5, 5, 5]}
                />
              </>
            )}

            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p
        className="mt-6 text-gray-600 text-center max-w-3xl mx-auto"
        data-aos="fade-up"
      >
        This graph shows the top 10 most important features in predicting
        diabetes. Features with higher importance have more impact on the
        model’s decisions.
      </p>

      <div
        className="mt-10 bg-white shadow-md rounded-2xl p-6 max-w-4xl mx-auto"
        data-aos="fade-up"
      >
        <h2 className="text-2xl font-semibold text-center mb-4 text-indigo-600">
          Analysis Summary
        </h2>
        <ul className="text-gray-700 space-y-3">
          <li>
            🔹 <b>Top Feature:</b> {sortedData[0]?.feature}
          </li>
          <li>🔹 Features 2–5 have moderate influence.</li>
          <li>🔹 Lower ones still support prediction stability.</li>
          <li>
            🔹 <b>Use Case:</b> Helps doctors detect early diabetes risks.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FeatureImportance;
