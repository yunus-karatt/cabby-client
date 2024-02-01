import { useSelector } from 'react-redux'
import { rootState } from '../../interface/user/userInterface'
import { Marker } from 'react-map-gl'

const Markers = ({sourceProps,destinationProps}:{sourceProps?:{latitude:number,longitude:number},destinationProps?:{latitude:number,longitude:number}}) => {
  const {destination,source}=useSelector((state:rootState)=>state.routeCoordinates)
  return (
    <div>
      {destination.lat&&destination.long &&
      !destinationProps &&
      <Marker
      latitude={destination.lat}
      longitude={destination.long} 
      />
    }
    {sourceProps?.latitude&& sourceProps.longitude &&
    <Marker
    latitude={sourceProps.latitude}
    longitude={sourceProps.longitude} 
    />
    }
    {destinationProps?.latitude&& destinationProps.longitude &&
    <Marker
    latitude={destinationProps.latitude}
    longitude={destinationProps.longitude} 
    />
    }
      {source.lat&&source.long && !sourceProps &&
      <Marker
      latitude={source.lat}
      longitude={source.long} 
      />
    }
    </div>
  )
}

export default Markers