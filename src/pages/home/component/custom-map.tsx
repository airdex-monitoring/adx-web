import { Map, Marker, } from '@vis.gl/react-google-maps'
import React from 'react'
import { IAirSensorSignal } from '../../../interfaces/IAirSensorSignal';
import SensorCircle from './sensor-circle';

interface CustomMapProps {
    airSensorData: IAirSensorSignal[];
}

const CustomMap = ({ airSensorData }: CustomMapProps) => {
    const [currentPosition, setCurrentPosition] = React.useState<any>(null);

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
                lat: currentPosition?.lat || 53,
                lng: currentPosition?.lng || 74
            }}
            defaultZoom={15}
        >
            {airSensorData?.filter(v => v.lat !== null && v.lon !== null).map((sensor, index) => (
                <SensorCircle sensor={sensor} key={index} />
            ))}
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