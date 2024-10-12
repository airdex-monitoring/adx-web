import { Map, MapCameraChangedEvent, MapCameraProps, Marker, RenderingType } from '@vis.gl/react-google-maps'
import React from 'react'
import { IAirSensorSignal } from '../../../interfaces/IAirSensorSignal';
import SensorCircle from './sensor-circle';

interface CustomMapProps {
    airSensorData: IAirSensorSignal[];
}

const INITIAL_CAMERA = {
    center: {
        lat: localStorage.getItem("currentPosition") ? JSON.parse(localStorage.getItem("currentPosition") || "").lat : 0,
        lng: localStorage.getItem("currentPosition") ? JSON.parse(localStorage.getItem("currentPosition") || "").lng : 0,
    },
    zoom: 14,
};

const CustomMap = ({ airSensorData }: CustomMapProps) => {
    const [cameraProps, setCameraProps] =
        React.useState<MapCameraProps>(INITIAL_CAMERA);
    const handleCameraChange = React.useCallback((ev: MapCameraChangedEvent) =>
        setCameraProps(ev.detail), []
    );

    return (
        <Map
            style={{ width: '100%', height: "500px" }}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            renderingType={RenderingType.VECTOR}
            {...cameraProps}
            onCameraChanged={handleCameraChange}
        >
            {airSensorData?.filter(v => v.lat !== null && v.lon !== null).map((sensor, index) => (
                <SensorCircle sensor={sensor} key={index} />
            ))}
            {localStorage.getItem("currentPosition") && (
                <Marker
                    key="currentPosition"
                    position={{
                        lat: localStorage.getItem("currentPosition") ? JSON.parse(localStorage.getItem("currentPosition") || "").lat : 0,
                        lng: localStorage.getItem("currentPosition") ? JSON.parse(localStorage.getItem("currentPosition") || "").lng : 0,
                    }}
                />
            )}
        </Map>
    )
}

export default CustomMap