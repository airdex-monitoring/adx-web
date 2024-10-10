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
      <CustomMap />


      {data &&
        data.map((item) => {
          return (
            <div key={item.id} className={"flex flex-col"}>
              <div className={"flex flex-row"}>
                <div className={"flex flex-col"}>
                  <p>{item.id}</p>
                  <p>{item.lat}</p>
                  <p>{item.lng}</p>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default AppLayout