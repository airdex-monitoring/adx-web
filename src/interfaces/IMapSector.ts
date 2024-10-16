export interface IMapSector {
    id: string;
    points: { lat: number; lon: number }[];
    aqiAvg: number;
    aqiLevel: string;
    pm_1_0_avg: number;
    pm_2_5_avg: number;
    pm_10_avg: number;
    createDate: Date;
}