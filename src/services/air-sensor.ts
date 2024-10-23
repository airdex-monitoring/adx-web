import { useQuery } from "react-query";
import { apiClient } from "../common/apiClient";
import { AqiQuery, IAirSensorSignal } from "../interfaces/IAirSensorSignal";
import { IMapSector } from "../interfaces/IMapSector";

const fetchData = async (
	sectorId?: number,
	query?: AqiQuery
): Promise<IAirSensorSignal[]> => {
	const { data } = await apiClient.aqi.findAll(sectorId);
	return data;
};

export const useFetchAirData = (sectorId?: number, query?: AqiQuery) => {
	const queryResult = useQuery(
		["air-quality", sectorId],
		() => fetchData(sectorId),
		{
			enabled: !!sectorId,
		}
	);
	return queryResult;
};

const fetchSectors = async (query?: AqiQuery): Promise<IMapSector[]> => {
	const { data } = await apiClient.aqi.getSectors(query);
	return data;
};

export const useFetchSectors = (query?: AqiQuery) => {
	const queryResult = useQuery(["sectors", query], () => fetchSectors(query));
	return queryResult;
};
