import React from 'react'
import Header from './components/ui/header'
import CustomMap from './components/custom-map'
import { APIProvider } from '@vis.gl/react-google-maps'

const App = () => {
  return (
    <APIProvider apiKey={String(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)}>
      <div className={"container flex flex-col"}>
        <Header />
        <CustomMap />
      </div>
    </APIProvider>
  )
}

export default App