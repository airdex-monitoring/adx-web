import React from "react";
import {
	useFetchAirData,
	useFetchAqiAvg,
	useFetchSectors,
} from "../../../services/air-sensor";
import {
	MapCameraChangedEvent,
	MapCameraProps,
	useApiIsLoaded,
	useMap,
	useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { INITIAL_CAMERA } from "../../../common/mapUtils";
import {
	AqiQuery,
	IAirSensorSignal,
} from "../../../interfaces/IAirSensorSignal";
import { IMapSector } from "../../../interfaces/IMapSector";
import { handleQualityColor } from "../../../common/color";
import { format } from "date-fns";

interface ICustomMap {
	isFilter?: boolean;
}

export const useCustomMap = ({ isFilter = false }: ICustomMap) => {
	const coreLib = useMapsLibrary("core");
	const map = useMap();
	const isMapLoaded = useApiIsLoaded();

	const [cameraProps, setCameraProps] =
		React.useState<MapCameraProps>(INITIAL_CAMERA);
	const infoWindowRef = React.useRef<google.maps.InfoWindow | null>(null);
	const dataLayerRef = React.useRef<google.maps.Data | null>(null);

	const [infowindowOpen, setInfowindowOpen] = React.useState(false);
	const [selectedSensor, setSelectedSensor] = React.useState<
		IAirSensorSignal | undefined
	>(undefined);
	const [selectedSector, setSelectedSector] = React.useState<
		IMapSector | undefined
	>(undefined);
	const [query, setQuery] = React.useState<AqiQuery | undefined>(undefined);

	const {
		data: sectors,
		isLoading: isLoadingSectors,
		error: sectorError,
		refetch: refectSectors,
	} = useFetchSectors(query);

	const {
		data: sensors,
		isLoading: isLoadingSensors,
		error: sensorError,
		refetch: refetchSensors,
	} = useFetchAirData(
		selectedSector ? Number(selectedSector.id) : undefined,
		query
	);

	const {
		data: aqiAvg,
		isLoading: isLoadingAqiAvg,
		error: aqiAvgError,
	} = useFetchAqiAvg({
		startDate: format(
			new Date(new Date().setHours(0, 0, 0, 0)),
			"dd-MM-yyyy HH:mm"
		),
		endDate: format(
			new Date(new Date().setHours(23, 59, 59, 0)),
			"dd-MM-yyyy HH:mm"
		),
	});

	React.useEffect(() => {
		if (!coreLib || !map || isFilter) return;

		// Clear the existing data layer
		if (dataLayerRef.current) {
			dataLayerRef.current.setMap(null);
			dataLayerRef.current = null;
		}

		// If sectors array is empty, do not add new data layer
		if (!Array.isArray(sectors) || sectors.length === 0) return;

		const dataLayer = new window.google.maps.Data(); // Initialize the Data Layer
		dataLayerRef.current = dataLayer; // Update the ref to the new data layer

		const geoJsonPolygons = {
			type: "FeatureCollection",
			features: sectors.map((polygon) => {
				const points = polygon.points.map((point) => [point.lon, point.lat]); // Reverse to [lng, lat]

				// Ensure the polygon is closed
				if (
					points[0][0] !== points[points.length - 1][0] ||
					points[0][1] !== points[points.length - 1][1]
				) {
					points.push(points[0]);
				}

				return {
					type: "Feature",
					geometry: {
						type: "Polygon",
						coordinates: [points],
					},
					properties: {
						...polygon,
					},
				};
			}),
		};

		dataLayer.addGeoJson(geoJsonPolygons);

		dataLayer.setStyle((feature: any) => {
			return {
				fillColor: handleQualityColor(feature.getProperty("aqiLevel")),
				strokeWeight: 1,
				strokeOpacity: 0.8,
				strokeColor: "#000000",
			};
		});

		dataLayer.addListener("click", (event: any) => {
			handleClickSector(
				{
					id: event.feature.getProperty("id"),
					points: event.feature
						.getGeometry()
						.getAt(0)
						.getArray()
						.map((point: any) => ({
							lat: point.lat(),
							lon: point.lng(),
						})),
					aqiAvg: event.feature.getProperty("aqiAvg"),
					aqiLevel: event.feature.getProperty("aqiLevel"),
					pm_1_0_avg: event.feature.getProperty("pm_1_0_avg"),
					pm_2_5_avg: event.feature.getProperty("pm_2_5_avg"),
					pm_10_avg: event.feature.getProperty("pm_10_avg"),
					createDate: event.feature.getProperty("createDate"),
				},
				event.latLng
			);
		});

		dataLayer.setMap(map);

		return () => {
			if (dataLayerRef.current) {
				dataLayerRef.current.setMap(null);
				dataLayerRef.current = null;
			}
		};

		//eslint-disable-next-line
	}, [coreLib, map, sectors, isFilter]);

	const handleCameraChange = React.useCallback(
		(ev: MapCameraChangedEvent) => setCameraProps(ev.detail),
		[]
	);

	const handleClickSector = (
		sector: IMapSector,
		position: google.maps.LatLng
	) => {
		setSelectedSector(sector);

		const headerContent = document.createElement("div");
		headerContent.className = "text-center text-black";
		headerContent.style.backgroundColor = handleQualityColor(sector.aqiLevel);
		headerContent.innerHTML = `
            <p class="text-lg font-bold">${Number(sector.aqiAvg).toFixed(
							1
						)} / 300</p>
            <p class="text-sm font-light">${sector.aqiLevel}</p>
        `;

		const content = document.createElement("table");
		content.innerHTML = `
            <tbody>
                <tr>
                    <td class="p-2" colspan="2">
                        <p class="text-left text-md font-bold">PM 1.0</p>
                    </td>
                    <td class="text-left font-light">${sector.pm_1_0_avg.toFixed(
											1
										)}</td>
                </tr>
                <tr>
                    <td class="p-2" colspan="2">
                        <p class="text-left text-md font-bold">PM 2.5</p>
                    </td>
                    <td class="text-left font-light">${sector.pm_2_5_avg.toFixed(
											1
										)}</td>
                </tr>
                <tr>
                    <td class="p-2" colspan="2">
                        <p class="text-left text-md font-bold">PM 10</p>
                    </td>
                    <td class="text-left font-light">${sector.pm_10_avg.toFixed(
											1
										)}</td>
                </tr>
            </tbody>
        `;

		if (infoWindowRef.current) {
			infoWindowRef.current.close();
		}

		const newInfoWindow = new window.google.maps.InfoWindow({
			content: content,
			zIndex: 1,
			headerContent: headerContent,
			position: position,
		});

		handleClose();
		newInfoWindow.open(map);
		infoWindowRef.current = newInfoWindow;
	};

	const handleCircleClick = (sensor: IAirSensorSignal) => {
		setSelectedSensor(sensor);
		setInfowindowOpen(true);

		if (infoWindowRef.current) {
			infoWindowRef.current.close();
		}
	};

	const handleClose = () => {
		setSelectedSensor(undefined);
		setInfowindowOpen(false);
	};

	const handleMapFilter = (query: AqiQuery) => {
		setQuery(query);
		if (dataLayerRef.current) {
			dataLayerRef.current.forEach((feature) => {
				dataLayerRef.current?.remove(feature);
			});
		}
		if (dataLayerRef.current) {
			dataLayerRef.current.setMap(null);
			dataLayerRef.current = null;
		}

		if (infoWindowRef.current) {
			infoWindowRef.current.close();
		}

		setSelectedSector(undefined);
	};

	const getCurrentPosition = () => {
		try {
			const positionString = localStorage.getItem("currentPosition");
			if (!positionString) {
				return null;
			}
			const position = JSON.parse(positionString);
			return position ? { lat: position.lat, lng: position.lng } : null;
		} catch (error) {
			console.error("Error parsing current position from localStorage", error);
			return null;
		}
	};

	const currentPosition = getCurrentPosition();

	return {
		map: {
			isMapLoaded,
			map,
			cameraProps,
			infowindowOpen,
			currentPosition,
		},
		sensor: {
			isLoadingSensors,
			sensors,
			sensorError,
			selectedSensor,
			refetchSensors,
		},
		sector: {
			isLoadingSectors,
			sectors,
			sectorError,
			selectedSector,
			refectSectors,
		},
		aqiAvg: {
			isLoadingAqiAvg,
			aqiAvg,
			aqiAvgError,
		},
		handlers: {
			handleCameraChange,
			handleCircleClick,
			handleClose,
			handleMapFilter,
			handleClickSector,
		},
	};
};
