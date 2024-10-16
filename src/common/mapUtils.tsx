import { AqiLevel } from "../interfaces/IAirSensorSignal";

export const INITIAL_CAMERA = {
  center: {
    lat: localStorage.getItem("currentPosition")
      ? JSON.parse(localStorage.getItem("currentPosition") || "").lat
      : 51.092003,
    lng: localStorage.getItem("currentPosition")
      ? JSON.parse(localStorage.getItem("currentPosition") || "").lng
      : 71.423560,
  },
  zoom: 14,
  maxZoom: 16.40,
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
    default:
      return "#000000";
  }
};
