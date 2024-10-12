import React from 'react'
import { AqiLevel, IAirSensorSignal } from '../../../interfaces/IAirSensorSignal'
import { Circle } from './circle';
import { InfoWindow } from '@vis.gl/react-google-maps';
import { format } from 'date-fns';

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
                radius={200}
                center={{
                    lat: Number(sensor.lat) + 0.0001,
                    lng: Number(sensor.lon) + 0.0001,
                }}
                onClick={() => handleCircleClick(sensor)}
                strokeOpacity={0.5}
                fillColor={handleQualityColor(sensor.aqiLevel)}
                fillOpacity={0.5}
            />
            {infowindowOpen && selectedSensor && selectedSensor.id === sensor.id && (
                <InfoWindow
                    position={{
                        lat: Number(selectedSensor.lat) + 0.0001,
                        lng: Number(selectedSensor.lon) + 0.0001,
                    }}
                    pixelOffset={[0, -30]}
                    headerContent={
                        <div className="text-center text-white"
                            style={{
                                backgroundColor: handleQualityColor(sensor.aqiLevel),
                            }}
                        >
                            <p className="text-lg font-bold">{`${sensor.aqi} / 100`}</p>
                            <p className="text-sm font-light">{sensor.aqiLevel}</p>
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
                                <td className='text-left font-light'>{sensor.pm_1_0}</td>
                            </tr>
                            <tr>
                                <td className="p-2" colSpan={2}>
                                    <p className="text-left text-md font-bold">PM 2.5</p>
                                </td>
                                <td className='text-left font-light'>{sensor.pm_2_5}</td>
                            </tr>
                            <tr>
                                <td className="p-2" colSpan={2}>
                                    <p className="text-left text-md font-bold">PM 10</p>
                                </td>
                                <td className='text-left font-light'>{sensor.pm_10}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="p-2" colSpan={2}>
                                    <p className="text-left text-md font-bold">Obtained at</p>
                                </td>
                                <td className='text-left font-light whitespace-pre-line'>
                                    {`${format(sensor.createDate, "dd-MM-yyyy")}
                                    ${format(sensor.createDate, "HH:mm:ss")}`}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </InfoWindow>
            )}
        </React.Fragment>
    )
}

export default SensorCircle