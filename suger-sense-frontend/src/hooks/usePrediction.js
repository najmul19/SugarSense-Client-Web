
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

export const usePrediction = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/predict", data);
      return res.data;
    },
  });
};
