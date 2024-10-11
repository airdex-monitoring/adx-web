import { Map, Marker, } from '@vis.gl/react-google-maps'
import React from 'react'
import { IAirSensorSignal } from '../../../interfaces/IAirSensorSignal';
import SensorCircle from './sensor-circle';

interface CustomMapProps {
    airSensorData: IAirSensorSignal[];
}

const CustomMap = ({ airSensorData }: CustomMapProps) => {
    return (
        <Map
            style={{ width: '100%', height: "500px" }}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            defaultCenter={{
                lat: localStorage.getItem("currentPosition") ? JSON.parse(localStorage.getItem("currentPosition") || "").lat : 0,
                lng: localStorage.getItem("currentPosition") ? JSON.parse(localStorage.getItem("currentPosition") || "").lng : 0,
            }}
            defaultZoom={15}
        >
            {airSensorData?.filter(v => v.lat !== null && v.lon !== null).map((sensor, index) => (
                <SensorCircle sensor={sensor} key={index} />
            ))}
            {localStorage.getItem("currentPosition") && (
                <Marker
                    key={"current"}
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