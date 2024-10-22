import { Map, Marker } from '@vis.gl/react-google-maps';
import { Circle } from './geometry/circle';
import InfoWindowSensor from './info-window-sensor';
import { handleQualityColor } from '../../../common/color';
import MapFilter from './map-filter';
import { Wrapper } from '../../../layout/wrapper';
import { useCustomMap } from '../hooks/useCustomMap';


const CustomMap = () => {
    const {
        map,
        sector,
        sensor,
        handlers
    } = useCustomMap({});

    return (
        <div className="w-full flex flex-col gap-[10px]" >
            <h3>Карта</h3>
            <MapFilter />
            <div className="flex justify-between items-center">
                <p className='font-sans italic text-sm leading-[15px] tracking-[-0.25px] text-[#868686]'>Последнее обновление: {map.secondsSinceLastUpdate && map.secondsSinceLastUpdate + " секунды назад"}</p>
            </div>
            <Wrapper error={!!sector.sectorError || !!sensor.sensorError} errorHeight={'800px'} isLoading={map.isMapLoaded && !sector.isLoadingSectors}>
                <div className='w-full overflow-hidden rounded-[15px]' style={{ height: window.innerHeight * 0.8 }}>
                    <Map
                        style={{ width: '100%', height: '100%' }}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                        {...map.cameraProps}
                        renderingType={'VECTOR'}
                        onCameraChanged={handlers.handleCameraChange}
                    >
                        {sensor.sensors && sensor.sensors?.map((sensor, index) => (
                            <Circle
                                radius={30}
                                center={{
                                    lat: Number(sensor.point.lat),
                                    lng: Number(sensor.point.lon),
                                }}
                                zIndex={2}
                                onClick={() => handlers.handleCircleClick(sensor)}
                                strokeOpacity={0.8}
                                strokeWeight={0.8}
                                fillColor={handleQualityColor(sensor.aqiLevel)}
                                fillOpacity={0.9}
                                key={index}
                            />
                        ))}
                        {map.infowindowOpen && sensor.selectedSensor && sector.selectedSector && (
                            <InfoWindowSensor sensor={sensor.selectedSensor} onClose={handlers.handleClose} />
                        )}
                        {map.currentPosition && (
                            <Marker
                                key="currentPosition"
                                position={map.currentPosition}
                            />
                        )}
                    </Map>
                </div>
            </Wrapper>
        </div>
    )
}

export default CustomMap;