export interface IAirSensorSignal {
  id: number;
  createDate: Date;

  lat: number;
  lon: number;

  pm1_0: number;
  pm2_5: number;
  pm10: number;

  aqi: number;
  aqiLevel: AqiLevel;
}

export interface IAirSensorSignalAcceptRequest {
  lat: number;
  lon: number;
  pm1_0: number;
  pm2_5: number;
  pm10: number;
}

export enum AqiLevel {
  "GOOD",
  "MODERATE",
  "UNHEALTHY_FOR_SENSITIVE_GROUP",
  "UNHEALTHY",
  "VERY_UNHEALTHY",
  "HAZARDOUS",
}
