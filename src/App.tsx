import React from 'react'
import Header from './components/ui/header'
import Map from './components/map'

const App = () => {
  return (
    <div className={"container flex flex-col"}>
      <Header />
      <Map />
    </div>
  )
}

export default App