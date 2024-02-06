// import { useEffect } from "react";
import { Layer, Source } from "react-map-gl";

const MapboxRoute = ({coordinates}:{coordinates:number[][]}) => {
  // useEffect(()=>console.log('route',{coordinates}))
  return (
    <Source
      type="geojson"
      data={{
        type: "Feature",
        geometry: { type: "LineString", coordinates: coordinates },
        properties: {},
      }}

    >
      <Layer
        type="line"
        layout={{ "line-join": "round", "line-cap": "square" }}
        paint={{ "line-color": "#0462d4", "line-width": 4 }}
      />
    </Source>
  );
};

export default MapboxRoute;
