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