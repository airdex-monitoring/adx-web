import Header from '../components/ui/header'
import CustomMap from '../pages/home/component/custom-map'
import { useFetchAirData } from '../services/air-sensor';

const AppLayout = () => {
  const {
    data
  } = useFetchAirData();

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