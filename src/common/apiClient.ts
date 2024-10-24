import axios, { AxiosResponse } from "axios";
import { AqiQuery, IAirSensorSignal, IAqiEntryAvg } from "../interfaces/IAirSensorSignal";
import { IMapSector } from "../interfaces/IMapSector";

const axiosApi = axios.create({
  timeout: 300000,
  withCredentials: false,
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const apiClient = {
  aqi: {
    findAll: async (
      sectorId?: number,
      query?: AqiQuery,
    ): Promise<AxiosResponse<IAirSensorSignal[]>> => {
      return await axiosApi.get(`/aqi/entries`, {
        params: {
          sectorId,
          startDate: query?.startDate,
          endDate: query?.endDate,
        },
      });
    },
    findAvg: async (query?: AqiQuery): Promise<AxiosResponse<IAqiEntryAvg>> => {
      return await axiosApi.get(`/aqi/entries-avg`, {
        params: {
          startDate: query?.startDate,
          endDate: query?.endDate,
        },
      });
    },
    getSectors: async (query?: AqiQuery): Promise<AxiosResponse<IMapSector[]>> => {
      return await axiosApi.get(`/aqi/map-sectors-avg`, {
        params: {
          startDate: query?.startDate,
          endDate: query?.endDate,
        },
      });
    },
  },
};
