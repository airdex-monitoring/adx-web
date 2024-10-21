import { Map, MapCameraChangedEvent, MapCameraProps, Marker, useApiIsLoaded, useMap, useMapsLibrary } from '@vis.gl/react-google-maps'
import React from 'react'
import { Circle } from './geometry/circle';
import { INITIAL_CAMERA } from '../../../common/mapUtils';
import { useFetchAirData } from '../../../services/air-sensor';
import { IMapSector } from '../../../interfaces/IMapSector';
import { IAirSensorSignal } from '../../../interfaces/IAirSensorSignal';
import InfoWindowSensor from './info-window-sensor';
import Spinner from '../../../components/ui/spinner';
import { handleQualityColor } from '../../../common/color';
import MapFilter from './map-filter';

interface ICustomMapProps {
    sectors?: IMapSector[];
}

const CustomMap = ({ sectors }: ICustomMapProps) => {
    const coreLib = useMapsLibrary('core');
    const map = useMap();
    const isLoaded = useApiIsLoaded();

    const [cameraProps, setCameraProps] = React.useState<MapCameraProps>(INITIAL_CAMERA);
    const infoWindowRef = React.useRef<google.maps.InfoWindow | null>(null);

    const [infowindowOpen, setInfowindowOpen] = React.useState(false);
    const [selectedSensor, setSelectedSensor] = React.useState<IAirSensorSignal | undefined>(undefined);
    const [selectedSector, setSelectedSector] = React.useState<IMapSector | undefined>(undefined);

    const { data: sensorData } = useFetchAirData(selectedSector ? Number(selectedSector.id) : undefined);

    const handleCameraChange = React.useCallback((ev: MapCameraChangedEvent) =>
        setCameraProps(ev.detail), []
    );

    const handleClickSector = (sector: IMapSector, position: google.maps.LatLng) => {
        setSelectedSector(sector);

        const headerContent = document.createElement('div');
        headerContent.className = 'text-center text-white';
        headerContent.style.backgroundColor = handleQualityColor(sector.aqiLevel);
        headerContent.innerHTML = `
            <p class="text-lg font-bold">${Number(sector.aqiAvg).toFixed(1)} / 300</p>
            <p class="text-sm font-light">${sector.aqiLevel}</p>
        `;

        const content = document.createElement('table');
        content.innerHTML = `
            <tbody>
                <tr>
                    <td class="p-2" colspan="2">
                        <p class="text-left text-md font-bold">PM 1.0</p>
                    </td>
                    <td class="text-left font-light">${sector.pm_1_0_avg.toFixed(1)}</td>
                </tr>
                <tr>
                    <td class="p-2" colspan="2">
                        <p class="text-left text-md font-bold">PM 2.5</p>
                    </td>
                    <td class="text-left font-light">${sector.pm_2_5_avg.toFixed(1)}</td>
                </tr>
                <tr>
                    <td class="p-2" colspan="2">
                        <p class="text-left text-md font-bold">PM 10</p>
                    </td>
                    <td class="text-left font-light">${sector.pm_10_avg.toFixed(1)}</td>
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
    }

    const handleCircleClick = (sensor: IAirSensorSignal) => {
        setSelectedSensor(sensor);
        setInfowindowOpen(true);

        if (infoWindowRef.current) {
            infoWindowRef.current.close();
        }
    }

    const handleClose = () => {
        setSelectedSensor(undefined);
        setInfowindowOpen(false);
    }


    React.useEffect(() => {
        if (!coreLib || !map || !Array.isArray(sectors)) return;

        const dataLayer = new window.google.maps.Data(); // Initialize the Data Layer

        const geoJsonPolygons = {
            type: 'FeatureCollection',
            features: sectors.map((polygon) => {
                const points = polygon.points.map(point => [point.lon, point.lat]); // Reverse to [lng, lat]

                // Ensure the polygon is closed
                if (points[0][0] !== points[points.length - 1][0] || points[0][1] !== points[points.length - 1][1]) {
                    points.push(points[0]);
                }

                return {
                    type: 'Feature',
                    geometry: {
                        type: 'Polygon',
                        coordinates: [points],
                    },
                    properties: {
                        ...polygon,
                    },
                };
            }),
        };

        dataLayer.addGeoJson(geoJsonPolygons);

        // Set styles for the polygons
        dataLayer.setStyle((feature: any) => {
            return {
                fillColor: handleQualityColor(feature.getProperty('aqiLevel')),
                strokeWeight: 1,
                strokeOpacity: 0.8,
                strokeColor: '#000000',
            };
        });

        // Add click event listener to fetch data by polygon ID
        dataLayer.addListener('click', (event: any) => {
            handleClickSector(
                {
                    id: event.feature.getProperty('id'),
                    points: event.feature.getGeometry().getAt(0).getArray().map((point: any) => ({
                        lat: point.lat(),
                        lon: point.lng(),
                    })),
                    aqiAvg: event.feature.getProperty('aqiAvg'),
                    aqiLevel: event.feature.getProperty('aqiLevel'),
                    pm_1_0_avg: event.feature.getProperty('pm_1_0_avg'),
                    pm_2_5_avg: event.feature.getProperty('pm_2_5_avg'),
                    pm_10_avg: event.feature.getProperty('pm_10_avg'),
                    createDate: event.feature.getProperty('createDate'),
                },
                event.latLng
            );
        });

        dataLayer.setMap(map);

        return () => {
            dataLayer.setMap(null);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coreLib, map, sectors, selectedSector]);


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

    return isLoaded ? (
        <div className="w-full flex flex-col gap-[10px]" >
            <h3>Карта</h3>
            <MapFilter />
            <div className='w-full overflow-hidden rounded-[15px]' style={{ height: window.innerHeight * 0.8 }}>
                <Map
                    style={{ width: '100%', height: '100%' }}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    tilt={0}
                    {...cameraProps}
                    renderingType={'VECTOR'}
                    onCameraChanged={handleCameraChange}
                >
                    {sensorData?.map((sensor, index) => (
                        <Circle
                            radius={30}
                            center={{
                                lat: Number(sensor.point.lat),
                                lng: Number(sensor.point.lon),
                            }}
                            zIndex={2}
                            onClick={() => handleCircleClick(sensor)}
                            strokeOpacity={0.8}
                            strokeWeight={0.8}
                            fillColor={handleQualityColor(sensor.aqiLevel)}
                            fillOpacity={0.9}
                            key={index}
                        />
                    ))}
                    {infowindowOpen && selectedSensor && selectedSector && (
                        <InfoWindowSensor sensor={selectedSensor} onClose={handleClose} />
                    )}
                    {currentPosition && (
                        <Marker
                            key="currentPosition"
                            position={currentPosition}
                        />
                    )}
                </Map>
            </div>
        </div>
    ) : <Spinner width='60' height='60' />
}

export default CustomMap