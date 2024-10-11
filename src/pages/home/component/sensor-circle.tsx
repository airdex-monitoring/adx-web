import React from 'react'
import { AqiLevel, IAirSensorSignal } from '../../../interfaces/IAirSensorSignal'
import { Circle } from './circle';

interface SensorCircleProps {
    sensor: IAirSensorSignal;
}

const handleQualityColor = (aqiLevel: string) => {
    switch (aqiLevel) {
        case AqiLevel.GOOD:
            return "#10B981";
        case AqiLevel.MODERATE:
            return "#F59E0B";
        case AqiLevel.UNHEALTHY_FOR_SENSITIVE_GROUP:
            return "#F59E0B";
        case AqiLevel.UNHEALTHY:
            return "#EF4444";
        case AqiLevel.VERY_UNHEALTHY:
            return "#EF4444";
        case AqiLevel.HAZARDOUS:
            return "#EF4444";
    }
}

const SensorCircle = ({ sensor }: SensorCircleProps) => {
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

    return (
        <React.Fragment key={sensor.id}>
            <Circle
                radius={100}
                center={{
                    lat: Number(sensor.lat) + 0.0001,
                    lng: Number(sensor.lon) + 0.0001,
                }}
                strokeColor={'#0c4cb3'}
                onClick={() => handleCircleClick(sensor)}
                strokeOpacity={1}
                strokeWeight={2}
                fillColor={handleQualityColor(sensor.aqiLevel)}
                fillOpacity={0.3}
            />
            {infowindowOpen && selectedSensor && selectedSensor.id === sensor.id && (
                <table
                    className="absolute bg-white rounded-md shadow-lg min-w-60"
                    style={{
                        top: `${sensor.lat}px`,
                        left: `${sensor.lon}px`,
                    }}
                >
                    <thead
                        className={"rounded-md text-white"}
                        style={{
                            backgroundColor: handleQualityColor(sensor.aqiLevel),
                        }}
                    >
                        <tr>
                            <td className={"p-2 text-left text-lg"} colSpan={2}>{sensor.aqi}</td>
                            <td colSpan={2}>{sensor.aqiLevel}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={"p-2"} colSpan={2}>
                                <p className={"text-left text-md"}>PM 1.0</p>
                            </td>
                            <td>{sensor.pm_1_0}</td>
                        </tr>
                        <tr>
                            <td className={"p-2"} colSpan={2}>
                                <p className={"text-left text-md"}>PM 2.5</p>
                            </td>
                            <td>{sensor.pm_2_5}</td>
                        </tr>
                        <tr>
                            <td className={"p-2"} colSpan={2}>
                                <p className={"text-left text-md"}>PM 10</p>
                            </td>
                            <td>{sensor.pm_10}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </React.Fragment>
    )
}

export default SensorCircle