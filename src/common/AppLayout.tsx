import Header from '../components/ui/header'
import CustomMap from '../pages/home/component/custom-map'
import { useFetchAirData } from '../services/air-sensor';

const AppLayout = () => {
  const {
    data,
    isLoading
  } = useFetchAirData();

  return (
    <div className={"container flex flex-col"}>
      <Header />
      <CustomMap />
    </div>
  )
}

export default AppLayout