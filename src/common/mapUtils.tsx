import Spinner from "../components/ui/spinner";
import { AqiLevel } from "../interfaces/IAirSensorSignal";
import { CONSTANTS } from "./constants";

export const INITIAL_CAMERA = {
  center: {
    lat: localStorage.getItem("currentPosition")
      ? JSON.parse(localStorage.getItem("currentPosition") || "").lat
      : CONSTANTS.ASTANA_AITU_POINT.lat,
    lng: localStorage.getItem("currentPosition")
      ? JSON.parse(localStorage.getItem("currentPosition") || "").lng
      : CONSTANTS.ASTANA_AITU_POINT.lng,
  },
  zoom: CONSTANTS.INITIAL_CAMERA.zoom,
  maxZoom: CONSTANTS.INITIAL_CAMERA.maxZoom,
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

export const renderLoading = (isLoading: boolean, child: React.ReactNode | React.ReactNode[]) => {
  return isLoading
    ? <Spinner width="64" height="64" />
    : child
}
