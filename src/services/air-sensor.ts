import { useQuery } from "react-query";
import { apiClient } from "../common/apiClient";
import { IAirSensorSignal } from "../interfaces/IAirSensorSignal";
import { IMapSector } from "../interfaces/IMapSector";

const QUERY_KEY = "air-quality";

const fetchData = async (sectorId?: number): Promise<IAirSensorSignal[]> => {
  const { data } = await apiClient.aqi.findAll(sectorId);
  return data;
};

export const useFetchAirData = (sectorId?: number) => {
  const queryResult = useQuery(
    [QUERY_KEY, sectorId],
    () => fetchData(sectorId),
    {
      enabled: !!sectorId,
    }
  );
  return queryResult;
};

const fetchSectors = async (): Promise<IMapSector[]> => {
  const { data } = await apiClient.aqi.getSectors();
  return data;
};

export const useFetchSectors = () => {
  const queryResult = useQuery("sectors", fetchSectors);
  return queryResult;
};
