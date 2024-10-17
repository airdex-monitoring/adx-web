import React from 'react';
import Header from '../../components/ui/header'
import CustomMap from './component/custom-map'
import { useFetchSectors } from '../../services/air-sensor';

const AppLayout = () => {
  const { data } = useFetchSectors();

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
      <CustomMap sectors={data} />
    </div>
  )
}

export default AppLayout