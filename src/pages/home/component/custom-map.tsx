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
            <MapFilter handlerMapFilter={handlers.handleMapFilter} />
            <button onClick={handlers.handleRefetch} className='flex flex-row gap-1 items-center'>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.534 7.00002H15.466C15.5135 7.00004 15.56 7.01359 15.6001 7.03909C15.6402 7.06459 15.6722 7.10098 15.6923 7.144C15.7125 7.18702 15.7199 7.23489 15.7138 7.282C15.7078 7.32912 15.6884 7.37352 15.658 7.41002L13.692 9.77002C13.6685 9.79816 13.6392 9.82079 13.606 9.83633C13.5728 9.85186 13.5366 9.85991 13.5 9.85991C13.4634 9.85991 13.4272 9.85186 13.394 9.83633C13.3608 9.82079 13.3315 9.79816 13.308 9.77002L11.342 7.41002C11.3116 7.37352 11.2922 7.32912 11.2861 7.282C11.2801 7.23489 11.2875 7.18702 11.3077 7.144C11.3278 7.10098 11.3598 7.06459 11.3999 7.03909C11.44 7.01359 11.4865 7.00004 11.534 7.00002ZM0.533995 9.00002H4.46599C4.5135 9.00001 4.56001 8.98645 4.60009 8.96096C4.64017 8.93546 4.67216 8.89907 4.69231 8.85605C4.71245 8.81303 4.71992 8.76516 4.71385 8.71804C4.70777 8.67093 4.6884 8.62652 4.65799 8.59002L2.69199 6.23002C2.66853 6.20189 2.63917 6.17925 2.60599 6.16372C2.57282 6.14819 2.53663 6.14014 2.49999 6.14014C2.46336 6.14014 2.42717 6.14819 2.39399 6.16372C2.36082 6.17925 2.33146 6.20189 2.30799 6.23002L0.341995 8.59002C0.311592 8.62652 0.292219 8.67093 0.286142 8.71804C0.280066 8.76516 0.287538 8.81303 0.307684 8.85605C0.32783 8.89907 0.359816 8.93546 0.399896 8.96096C0.439976 8.98645 0.486491 9.00001 0.533995 9.00002Z" fill="#868686" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.00001 2.99999C6.44801 2.99999 5.06001 3.70699 4.14301 4.81799C4.10206 4.87106 4.05086 4.91536 3.99245 4.94825C3.93404 4.98114 3.86961 5.00194 3.803 5.00943C3.73638 5.01692 3.66895 5.01094 3.60469 4.99184C3.54043 4.97275 3.48068 4.94092 3.42897 4.89827C3.37726 4.85561 3.33465 4.803 3.30368 4.74354C3.27272 4.68409 3.25402 4.61902 3.24871 4.5522C3.24339 4.48538 3.25157 4.41817 3.27275 4.35457C3.29394 4.29097 3.32769 4.23228 3.37201 4.18199C4.1042 3.29552 5.0756 2.638 6.17067 2.28764C7.26575 1.93729 8.43841 1.90884 9.54918 2.20568C10.66 2.50252 11.6621 3.11215 12.4364 3.96208C13.2107 4.812 13.7246 5.86644 13.917 6.99999H12.9C12.6695 5.87062 12.0558 4.85559 11.1629 4.12668C10.27 3.39777 9.15266 2.99975 8.00001 2.99999ZM3.10001 8.99999C3.28932 9.92461 3.73636 10.7768 4.38949 11.4581C5.04261 12.1394 5.87517 12.6221 6.79097 12.8503C7.70677 13.0785 8.66845 13.0429 9.5649 12.7477C10.4613 12.4525 11.256 11.9097 11.857 11.182C11.898 11.1289 11.9492 11.0846 12.0076 11.0517C12.066 11.0188 12.1304 10.998 12.197 10.9905C12.2636 10.9831 12.3311 10.989 12.3953 11.0081C12.4596 11.0272 12.5193 11.0591 12.5711 11.1017C12.6228 11.1444 12.6654 11.197 12.6963 11.2564C12.7273 11.3159 12.746 11.381 12.7513 11.4478C12.7566 11.5146 12.7484 11.5818 12.7273 11.6454C12.7061 11.709 12.6723 11.7677 12.628 11.818C11.8958 12.7045 10.9244 13.362 9.82934 13.7123C8.73427 14.0627 7.56161 14.0911 6.45083 13.7943C5.34006 13.4975 4.33791 12.8878 3.5636 12.0379C2.78928 11.188 2.27538 10.1335 2.08301 8.99999H3.10001Z" fill="#868686" />
                </svg>
                <p className='font-sans italic text-sm leading-[15px] tracking-[-0.25px] text-[#868686]'>Обновить</p>

            </button>
            <Wrapper error={!!sector.sectorError || !!sensor.sensorError} errorHeight={800} isLoading={!map.isMapLoaded || sector.isLoadingSectors}>
                <div className='w-full overflow-hidden rounded-[15px]' style={{ height: window.innerHeight * 0.8 }}>
                    <Map
                        style={{ width: '100%', height: '100%' }}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                        {...map.cameraProps}
                        renderingType={'VECTOR'}
                        onCameraChanged={handlers.handleCameraChange}
                    >
                        {sensor.sensors && !sensor.isLoadingSensors && sensor.sensors?.map((sensor, index) => (
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