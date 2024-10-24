import axios, { AxiosResponse } from "axios";
import {
  IAirSensorSignal,
} from "../interfaces/IAirSensorSignal";
import { IMapSector } from "../interfaces/IMapSector";

const axiosApi = axios.create({
  timeout: 300000,
  withCredentials: false,
  baseURL: process.env.REACT_APP_BACKEND_URL
})

export const apiClient = {
  aqi: {
    findAll: async (sectorId?: number): Promise<AxiosResponse<IAirSensorSignal[]>> => {
      return await axiosApi.get(`/aqi`, { params: { sectorId } });
    },
    getSectors: async (): Promise<AxiosResponse<IMapSector[]>> => {
      return await axiosApi.get(`/aqi/map-sectors-avg`);
    },
  },
};
