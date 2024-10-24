export interface IAirSensorSignal {
  id: number;
  createDate: Date;
  point: LanLngPointDto;
  pm_1_0: number;
  pm_2_5: number;
  pm_10: number;
  aqi: number;
  aqiLevel: AqiLevel;
}

export interface LanLngPointDto {
  lat: number;
  lon: number;
}

export interface IAirSensorSignalAcceptRequest {
  lat: number;
  lon: number;
  pm1_0: number;
  pm2_5: number;
  pm10: number;
}

export interface AqiQuery {
  startDate: string;
  endDate: string;
}

export enum AqiLevel {
  "GOOD" = "GOOD",
  "MODERATE" = "MODERATE",
  "UNHEALTHY_FOR_SENSITIVE_GROUP" = "UNHEALTHY_FOR_SENSITIVE_GROUP",
  "UNHEALTHY" = "UNHEALTHY",
  "VERY_UNHEALTHY" = "VERY_UNHEALTHY",
  "HAZARDOUS" = "HAZARDOUS",
}

export interface IAqiEntryAvg {
  aqiAvg?: number;
  aqiAvgLevel?: AqiLevel;

  aqiMin?: number;
  aqiMinLevel?: AqiLevel;

  aqiMax?: number;
  aqiMaxLevel?: AqiLevel;

  pm_1_0_min?: number;
  pm_1_0_max?: number;
  pm_1_0_avg?: number;

  pm_2_5_min?: number;
  pm_2_5_max?: number;
  pm_2_5_avg?: number;

  pm_10_min?: number;
  pm_10_max?: number;
  pm_10_avg?: number;
}
