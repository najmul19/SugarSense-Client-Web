import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, XAxis, YAxis, Legend, Bar } from "recharts";
import { FaUsers, FaHeartbeat, FaChartBar, FaClipboardCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import useAxiosSecure from "../../api/Hooks/useAxiosSecure";
import AOS from "aos";

const COLORS = ["#EF4444", "#10B981"]; 

const Dashboard = () => {
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard");
      return res.data.data;
    },
  });

  if (isLoading)
    return <p className="text-center py-10 text-gray-500 animate-pulse">Analyzing dashboard data...</p>;
  if (isError)
    return <p className="text-center py-10 text-red-500">Error loading dashboard data.</p>;

  const { totalUsers, totalPredictions, diabeticCount, nonDiabeticCount } = data;

  const pieData = [
    { name: "Diabetic", value: diabeticCount },
    { name: "Non-Diabetic", value: nonDiabeticCount },
  ];

  const barData = [
    { name: "Users", value: totalUsers },
    { name: "Predictions", value: totalPredictions },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 md:px-8 lg:px-16 py-10">
      <h1 data-aos="fade-down" className="text-3xl font-bold text-center text-gray-800 mb-6">
        System Analytics Dashboard
      </h1>
      <p data-aos="fade-up" className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Monitor user activities and diabetes prediction trends in real time.
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <motion.div data-aos="fade-up" className="bg-white shadow-md rounded-2xl p-6 text-center border-t-4 border-blue-500">
          <FaClipboardCheck className="text-blue-500 text-4xl mx-auto mb-3" />
          <h3 className="text-lg font-semibold">Total Predictions</h3>
          <p className="text-4xl font-bold text-gray-800">{totalPredictions}</p>
        </motion.div>

        <motion.div data-aos="fade-up" className="bg-white shadow-md rounded-2xl p-6 text-center border-t-4 border-green-500">
          <FaUsers className="text-green-500 text-4xl mx-auto mb-3" />
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-4xl font-bold text-gray-800">{totalUsers}</p>
        </motion.div>

        <motion.div data-aos="fade-up" className="bg-white shadow-md rounded-2xl p-6 text-center border-t-4 border-red-500">
          <FaHeartbeat className="text-red-500 text-4xl mx-auto mb-3" />
          <h3 className="text-lg font-semibold">Diabetic</h3>
          <p className="text-4xl font-bold text-gray-800">{diabeticCount}</p>
        </motion.div>

        <motion.div data-aos="fade-up" className="bg-white shadow-md rounded-2xl p-6 text-center border-t-4 border-teal-500">
          <FaChartBar className="text-teal-500 text-4xl mx-auto mb-3" />
          <h3 className="text-lg font-semibold">Non-Diabetic</h3>
          <p className="text-4xl font-bold text-gray-800">{nonDiabeticCount}</p>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Pie Chart */}
        <div
          data-aos="fade-right"
          className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Prediction Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div
          data-aos="fade-left"
          className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4">System Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3B82F6" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
