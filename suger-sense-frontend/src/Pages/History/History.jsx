import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useAuth from "../../api/Hooks/useAuth";
import useAxiosSecure from "../../api/Hooks/useAxiosSecure";
import "../../globals.css";

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

  if (isLoading) {
    return (
      <div
        className="flex justify-center items-center h-screen text-lg font-medium"
        data-aos="fade-in"
      >
        Loading your prediction history...
      </div>
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
      <div className="text-center text-gray-500 mt-10" data-aos="zoom-in">
        You haven’t made any predictions yet.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 mt-10" data-aos="fade-up">
      <h2
        className="text-2xl font-bold text-center mb-8 text-blue-700"
        data-aos="fade-down"
      >
        🧾 Your Prediction History
      </h2>

      <div className="overflow-x-auto" data-aos="fade-up">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="card-bg-secondary text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Inputs</th>
              <th className="py-3 px-4 text-left">Result</th>
              <th className="py-3 px-4 text-left">Date</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
