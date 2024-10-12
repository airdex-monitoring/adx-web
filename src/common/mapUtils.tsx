import { AqiLevel } from "../interfaces/IAirSensorSignal";

export const INITIAL_CAMERA = {
  center: {
    lat: localStorage.getItem("currentPosition")
      ? JSON.parse(localStorage.getItem("currentPosition") || "").lat
      : 0,
    lng: localStorage.getItem("currentPosition")
      ? JSON.parse(localStorage.getItem("currentPosition") || "").lng
      : 0,
  },
  zoom: 14,
};

export const handleQualityColor = (aqiLevel: string) => {
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
};
