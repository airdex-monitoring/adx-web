import { Map, Marker } from '@vis.gl/react-google-maps'
import React from 'react'
import { Circle } from './circle';

const CustomMap: React.FC = () => {
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

    return currentPosition ? (
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
            <Circle
                radius={50}
                center={currentPosition}
                strokeColor={'#0c4cb3'}
                strokeOpacity={1}
                strokeWeight={2}
                fillColor={'#3b82f6'}
                fillOpacity={0.3}
            />
            <Marker position={currentPosition} />
        </Map>
    ) : <>Loading ....</>
}

export default CustomMap