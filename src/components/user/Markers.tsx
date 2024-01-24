import { useSelector } from 'react-redux'
import { rootState } from '../../interface/user/userInterface'
import { Marker } from 'react-map-gl'

const Markers = () => {
  const {destination,source}=useSelector((state:rootState)=>state.routeCoordinates)
  return (
    <div>
      {destination.lat&&destination.long &&
      <Marker
      latitude={destination.lat}
      longitude={destination.long} 
      />
    }
      {source.lat&&source.long &&
      <Marker
      latitude={source.lat}
      longitude={source.long} 
      />
    }
    </div>
  )
}

export default Markers