import React from 'react'
import { IAirSensorSignal } from '../../../interfaces/IAirSensorSignal';
import { handleQualityColor } from '../../../common/mapUtils';
import { InfoWindow } from '@vis.gl/react-google-maps';
import { format } from 'date-fns';

interface InfoWindowSensorProps {
    sensor: IAirSensorSignal;
    onClose: () => void;
}

const InfoWindowSensor: React.FC<InfoWindowSensorProps> = ({ sensor, onClose }) => {
    return (
        <InfoWindow
            position={{
                lat: Number(sensor.point.lat),
                lng: Number(sensor.point.lon),
            }}
            shouldFocus={false}
            headerContent={
                <div className="text-center text-white"
                    style={{
                        backgroundColor: handleQualityColor(sensor.aqiLevel),
                    }}
                >
                    <p className="text-lg font-bold">{`${sensor.aqi} / 300`}</p>
                    <p className="text-sm font-light">{sensor.aqiLevel}</p>
                </div>
            }
            onCloseClick={onClose}
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
    );
};

export default InfoWindowSensor