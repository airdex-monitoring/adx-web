import Header from '../components/ui/header'
import CustomMap from '../pages/home/component/custom-map'

const AppLayout = () => {
  return (
    <div className={"container flex flex-col"}>
      <Header />
      <CustomMap />
    </div>
  )
}

export default AppLayout