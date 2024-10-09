export interface IAirSensorSignal {
    id: number;
    lat: number;
    lng: number;
    pm1_0: number;
    pm2_5: number;
    pm10: number;
    aqi: number;
    createDate: Date;
}