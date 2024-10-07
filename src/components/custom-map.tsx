import { Map, Marker } from '@vis.gl/react-google-maps'
import React from 'react'

const CustomMap: React.FC = () => {
    const [currentPosition, setCurrentPosition] = React.useState<any>(null);

    React.useEffect(() => {
        // Get the current location
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
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    return (
        <Map
            style={{ width: '100%', height: "500px" }}
            initialViewState={{
                latitude: currentPosition?.lat,
                longitude: currentPosition?.lng,
                zoom: 12,
            }}
            defaultZoom={12}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
        >
            <Marker position={currentPosition} />
        </Map>
    )
}

export default CustomMap