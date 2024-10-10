import { InfoWindow, Map, Marker, useAdvancedMarkerRef } from '@vis.gl/react-google-maps'
import React from 'react'
import { Circle } from './circle';
import { IAirSensorSignal } from '../../../interfaces/IAirSensorSignal';

interface CustomMapProps {
    airSensorData: IAirSensorSignal[];
}

const CustomMap = ({ airSensorData }: CustomMapProps) => {
    const [currentPosition, setCurrentPosition] = React.useState<any>(null);
    const [infowindowOpen, setInfowindowOpen] = React.useState(false);
    const [selectedSensor, setSelectedSensor] = React.useState<IAirSensorSignal | null>(null);

    const handleCircleClick = (sensor: IAirSensorSignal) => {
        setSelectedSensor(sensor);
        setInfowindowOpen(true);
    };

    const handleClose = () => {
        setInfowindowOpen(false);
        setSelectedSensor(null);
    };

    React.useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        }
        else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    return (
        <Map
            style={{ width: '100%', height: "500px" }}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            defaultCenter={{
                lat: currentPosition?.lat || 0,
                lng: currentPosition?.lng || 0
            }}
            defaultZoom={15}
        >
            {airSensorData?.filter(v => v.lat !== null && v.lon !== null).map((sensor, index) => (
                <Circle
                    key={index}
                    radius={5}
                    center={{
                        lat: Number(sensor.lat) + index * 0.0001,
                        lng: Number(sensor.lon) + index * 0.0001,
                    }}
                    strokeColor={'#0c4cb3'}
                    onClick={() => handleCircleClick(sensor)}
                    strokeOpacity={1}
                    strokeWeight={2}
                    fillColor={'#3b82f6'}
                    fillOpacity={0.3}
                />
            ))}
            {infowindowOpen && selectedSensor && (
                <div className={"absolute top-12 left-12 bg-white p-4 shadow-lg"}>
                    <h3>Sensor Information</h3>
                    <p>Latitude: {selectedSensor.lat}</p>
                    <p>Longitude: {selectedSensor.lon}</p>
                    <p>Other Info: {selectedSensor.aqiLevel}</p>
                    <button onClick={handleClose}>Close</button>
                </div>
            )}
            {currentPosition && (
                <Marker
                    key={"current"}
                    position={{
                        lat: currentPosition.lat,
                        lng: currentPosition.lng
                    }}
                />
            )}
        </Map>
    )
}

export default CustomMap