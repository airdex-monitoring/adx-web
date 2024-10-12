import axios, { AxiosResponse } from "axios";
import {
  IAirSensorSignal,
  IAirSensorSignalAcceptRequest,
} from "../interfaces/IAirSensorSignal";

axios.defaults.timeout = 300000;
axios.defaults.withCredentials = false;

const baseURL =
  process.env.REACT_APP_API_URL || "http://localhost:8080/api/v1/";

export const apiClient = {
  airSensor: {
    findAll: async (): Promise<AxiosResponse<IAirSensorSignal[]>> => {
      return await axios.get(`${baseURL}/air-signals`);
    },
    save: async (
      data: IAirSensorSignalAcceptRequest
    ): Promise<AxiosResponse<IAirSensorSignal>> => {
      return await axios.post(`${baseURL}/air-signals`, data);
    },
  },
};
