import axios, { AxiosResponse } from "axios";
import {
  IAirSensorSignal,
  IAirSensorSignalAcceptRequest,
} from "../interfaces/IAirSensorSignal";

const axiosApi = axios.create({
  timeout: 300000,
  withCredentials: false,
  baseURL: process.env.REACT_APP_BACKEND_URL
})

export const apiClient = {
  airSensor: {
    findAll: async (): Promise<AxiosResponse<IAirSensorSignal[]>> => {
      return await axiosApi.get(`/air-signals`);
    },
    save: async (
      data: IAirSensorSignalAcceptRequest
    ): Promise<AxiosResponse<IAirSensorSignal>> => {
      return await axiosApi.post(`/air-signals`, data);
    },
  },
};
