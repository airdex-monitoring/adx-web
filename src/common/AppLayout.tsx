"use server";

import React from 'react';
import Header from '../components/ui/header'
import CustomMap from '../pages/home/component/custom-map'
import { useFetchAirData } from '../services/air-sensor';

const AppLayout = () => {
  const {
    data
  } = useFetchAirData();

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          localStorage.setItem("currentPosition", JSON.stringify({ lat: latitude, lng: longitude }));
        },
        (error) => {
          console.error("Error getting location:", error);
          localStorage.clear();
        }
      );
    }
    else {
      console.error("Geolocation is not supported by this browser.");
      localStorage.clear();
    }
  }, []);

  return (
    <div className={"container flex flex-col"}>
      <Header />
      {data && (
        <CustomMap airSensorData={data} />
      )}
    </div>
  )
}

export default AppLayout