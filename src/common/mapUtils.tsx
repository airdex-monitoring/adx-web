import Spinner from "../components/ui/spinner";
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

export const renderLoading = (isLoading: boolean, child: React.ReactNode | React.ReactNode[]) => {
  return isLoading
    ? <Spinner width="64" height="64" />
    : child
}
