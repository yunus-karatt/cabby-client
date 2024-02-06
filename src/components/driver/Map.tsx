import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import ReactMapGL, { MapRef, Marker, NavigationControl } from "react-map-gl";
import MapboxRoute from "../user/MapboxRoute";
// import Markers from "../user/Markers";
import { DirectionsApiResponse } from "../../interface/common/common";
// import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Map = ({
  source,
  destination,
  directionData
}: {
  source: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
  directionData?:DirectionsApiResponse
}) => {
  const mapRef = useRef<MapRef|null>(null);

  useEffect(()=>{
    mapRef?.current?.flyTo({
      center:[
        source.longitude,
        source.latitude
      ],
      animate:true,
      duration:1500,
      zoom:15
    })

  },[source])

  return (
    <div className="w-full h-[100%] bg-secondary flex gap-x-4">
        <div className="h-full w-full">
          <ReactMapGL
            ref={mapRef}
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              latitude: source.latitude,
              longitude: source.longitude,
              zoom: 15,
              
            }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            
          >
            {/* <Markers destinationProps={destination} sourceProps={source} /> */}
            <Marker latitude={source.latitude} longitude={source.longitude} />
            <Marker latitude={destination.latitude} longitude={destination.longitude} />
            {directionData?.routes && (
              <MapboxRoute
                coordinates={directionData?.routes[0]?.geometry?.coordinates}
              />
            )}
            <NavigationControl visualizePitch position="bottom-right" />
          
          </ReactMapGL>
        </div>
    </div>
  );
};

export default Map;
