import React from 'react';
import Header from '../../layout/header'
import CustomMap from './component/custom-map'
import SummaryBox from './component/summary-box';

const AppLayout = () => {
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
    <div className={"container flex flex-col gap-4"}>
      <Header />
      <SummaryBox />
      <CustomMap />
    </div>
  )
}

export default AppLayout