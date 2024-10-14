import { InfoWindow, Map, MapCameraChangedEvent, MapCameraProps, Marker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps'
import React from 'react'
import { IAirSensorSignal } from '../../../interfaces/IAirSensorSignal';
import { format } from 'date-fns';
import { Circle } from './geometry/circle';
import { handleQualityColor, INITIAL_CAMERA } from '../../../common/mapUtils';
import { POLYGONS } from '../../../polygons';


interface CustomMapProps {
    airSensorData: IAirSensorSignal[];
}

const CustomMap = ({ airSensorData }: CustomMapProps) => {
    const coreLib = useMapsLibrary('core');
    const map = useMap();

    const [cameraProps, setCameraProps] = React.useState<MapCameraProps>(INITIAL_CAMERA);
    const [infowindowOpen, setInfowindowOpen] = React.useState(false);
    const [selectedSensor, setSelectedSensor] = React.useState<IAirSensorSignal | null>(null);

    const handleCameraChange = React.useCallback((ev: MapCameraChangedEvent) =>
        setCameraProps(ev.detail), []
    );

    const handleCircleClick = (sensor: IAirSensorSignal) => {
        setSelectedSensor(sensor);
        setInfowindowOpen(true);
    };

    const handleClose = () => {
        setInfowindowOpen(false);
        setSelectedSensor(null);
    };

    React.useEffect(() => {
        if (!coreLib || !map) return;

        const dataLayer = new window.google.maps.Data(); // Initialize the Data Layer

        const geoJsonPolygons = {
            type: 'FeatureCollection',
            features: POLYGONS.map((polygon) => {
                const points = polygon.points.map(point => [point[1], point[0]]); // Reverse to [lng, lat]

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
                        id: polygon.code,
                        fillColor: '#000000',
                    },
                };
            }),
        }
        dataLayer.addGeoJson(geoJsonPolygons);

        // Set styles for the polygons
        dataLayer.setStyle((feature: any) => {
            return {
                fillColor: "#FFFFFF", // Return the color as a valid string
                strokeWeight: 0.7,
            };
        });

        // Add click event listener to fetch data by polygon ID
        dataLayer.addListener('click', (event: any) => {
            const polygonId = event.feature.getProperty('id'); // Get the polygon ID
            console.log('Polygon clicked with ID:', polygonId);

            // new window.google.maps.InfoWindow({
            //     content: `Polygon ID: ${polygonId}`,
            //     position: {
            //         lat: event.latLng.lat(),
            //         lng: event.latLng.lng(),
            //     }
            // }).open(map);
        });

        dataLayer.setMap(map);

        return () => {
            dataLayer.setMap(null);
        };
    }, [coreLib, map]);

    const filteredSensorData = React.useMemo(() => {
        return airSensorData.filter(v => v.lat !== null && v.lon !== null);
    }, [airSensorData]);

    const getCurrentPosition = () => {
        try {
            const position = JSON.parse(localStorage.getItem("currentPosition") || "");
            return position ? { lat: position.lat, lng: position.lng } : null;
        } catch (error) {
            console.error("Error parsing current position from localStorage", error);
            return null;
        }
    };

    const currentPosition = getCurrentPosition();

    return (
        <Map
            style={{ width: '100%', height: window.innerHeight * 0.8 }}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            {...cameraProps}
            renderingType={'VECTOR'}
            colorScheme={'FOLLOW_SYSTEM'}
            onCameraChanged={handleCameraChange}
        >
            {filteredSensorData.map((sensor, index) => (
                <Circle
                    radius={30}
                    center={{
                        lat: Number(sensor.lat) + 0.0001,
                        lng: Number(sensor.lon) + 0.0001,
                    }}
                    onClick={() => handleCircleClick(sensor)}
                    strokeOpacity={0.5}
                    strokeWeight={0.5}
                    fillColor={handleQualityColor(sensor.aqiLevel)}
                    fillOpacity={0.5}
                    key={index}
                />
            ))}
            {infowindowOpen && selectedSensor && (
                <InfoWindow
                    position={{
                        lat: Number(selectedSensor.lat) + 0.0001,
                        lng: Number(selectedSensor.lon) + 0.0001,
                    }}
                    shouldFocus={false}
                    headerContent={
                        <div className="text-center text-white"
                            style={{
                                backgroundColor: handleQualityColor(selectedSensor.aqiLevel),
                            }}
                        >
                            <p className="text-lg font-bold">{`${selectedSensor.aqi} / 100`}</p>
                            <p className="text-sm font-light">{selectedSensor.aqiLevel}</p>
                        </div>
                    }
                    onCloseClick={() => handleClose()}
                >
                    <table>
                        <tbody>
                            <tr>
                                <td className="p-2" colSpan={2}>
                                    <p className="text-left text-md font-bold">PM 1.0</p>
                                </td>
                                <td className='text-left font-light'>{selectedSensor.pm_1_0}</td>
                            </tr>
                            <tr>
                                <td className="p-2" colSpan={2}>
                                    <p className="text-left text-md font-bold">PM 2.5</p>
                                </td>
                                <td className='text-left font-light'>{selectedSensor.pm_2_5}</td>
                            </tr>
                            <tr>
                                <td className="p-2" colSpan={2}>
                                    <p className="text-left text-md font-bold">PM 10</p>
                                </td>
                                <td className='text-left font-light'>{selectedSensor.pm_10}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="p-2" colSpan={2}>
                                    <p className="text-left text-md font-bold">Obtained at</p>
                                </td>
                                <td className='text-left font-light whitespace-pre-line'>
                                    {`${format(selectedSensor.createDate, "dd-MM-yyyy")}
                                        ${format(selectedSensor.createDate, "HH:mm:ss")}`}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </InfoWindow>
            )}
            {currentPosition && (
                <Marker
                    key="currentPosition"
                    position={currentPosition}
                />
            )}
        </Map>
    )
}

export default CustomMap