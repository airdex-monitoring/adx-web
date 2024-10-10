import axios, { AxiosResponse } from "axios";
import {
  IAirSensorSignal,
  IAirSensorSignalAcceptRequest,
} from "../interfaces/IAirSensorSignal";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.timeout = 300000;
axios.defaults.withCredentials = false;

export const apiClient = {
  airSensor: {
    findAll: async (): Promise<AxiosResponse<IAirSensorSignal[]>> => {
      return await axios.get("/air-signals");
    },
    save: async (
      data: IAirSensorSignalAcceptRequest
    ): Promise<AxiosResponse<IAirSensorSignal>> => {
      return await axios.post("/air-signals", data);
    },
  },
};
