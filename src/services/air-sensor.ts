import { useQuery } from "react-query";
import { apiClient } from "../common/apiClient"
import { IAirSensorSignal } from "../interfaces/IAirSensorSignal"

const QUERY_KEY = 'air-quality';

const fetchData = async (): Promise<IAirSensorSignal[]> => {
    const { data } = await apiClient.airSensor.findAll();
    return data;
}

export const useFetchAirData = () => {
    return useQuery(QUERY_KEY, () => fetchData());
}