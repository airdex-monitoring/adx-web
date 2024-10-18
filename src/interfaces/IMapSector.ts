import { AqiLevel, LanLngPointDto } from "./IAirSensorSignal";

export interface IMapSector {
  id: string;
  points: LanLngPointDto[];
  aqiAvg: number;
  aqiLevel: AqiLevel;
  pm_1_0_avg: number;
  pm_2_5_avg: number;
  pm_10_avg: number;
  createDate: Date;
}
