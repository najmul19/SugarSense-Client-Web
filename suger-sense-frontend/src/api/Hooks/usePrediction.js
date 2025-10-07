import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

export const usePrediction = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post(`/predict?email=${user.email}`, data);
      return res.data;
    },
  });
};
