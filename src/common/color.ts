import { AqiLevel } from "../interfaces/IAirSensorSignal";

export const handleQualityColor = (aqiLevel: string) => {
    switch (aqiLevel) {
        case AqiLevel.GOOD:
            return "#BFF6C3";
        case AqiLevel.MODERATE:
            return "#FFE0B5";
        case AqiLevel.UNHEALTHY_FOR_SENSITIVE_GROUP:
            return "#FFE0B5";
        case AqiLevel.UNHEALTHY:
            return "#FF8787";
        case AqiLevel.VERY_UNHEALTHY:
            return "#FF8787";
        case AqiLevel.HAZARDOUS:
            return "#FF8787";
        default:
            return "#212427";
    }
};
