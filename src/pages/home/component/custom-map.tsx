import { InfoWindow, Map, MapCameraChangedEvent, MapCameraProps, Marker, RenderingType } from '@vis.gl/react-google-maps'
import React from 'react'
import { IAirSensorSignal } from '../../../interfaces/IAirSensorSignal';
import { format } from 'date-fns';
import { Circle } from './circle';
import { handleQualityColor, INITIAL_CAMERA } from '../../../common/mapUtils';

interface CustomMapProps {
    airSensorData: IAirSensorSignal[];
}

const CustomMap = ({ airSensorData }: CustomMapProps) => {
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

    return (
        <Map
            style={{ width: '100%', height: "500px" }}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            {...cameraProps}
            onCameraChanged={handleCameraChange}
        >
            {airSensorData?.filter(v => v.lat !== null && v.lon !== null).map((sensor, index) => (
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