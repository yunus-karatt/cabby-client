import axios from "axios";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import MapboxRoute from "../user/MapboxRoute";
import Markers from "../user/Markers";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Map = ({
  source,
  destination,
}: {
  source: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
}) => {
  const mapRef = useRef(null);

  const [driverCoords, setDriverCoords] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  });
  const [directionData, setDirectionData] = useState<any>();

  const [mapLoading, setMapLoading] = useState(true);

  // get current coords
  const getCurrentCoords = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setDriverCoords(() => ({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      }));
      setMapLoading(false);
    });
  };

  const getDirectionRoute = async () => {
    try {
      console.log(driverCoords.latitude);
      console.log(import.meta.env.VITE_MAPBOX_ACCESS_TOKEN);
      const res = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${
          driverCoords.longitude
        },${driverCoords.latitude};${source.longitude},${
          source.latitude
        }?overview=full&geometries=geojson&access_token=${
          import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
        }`
      );
      console.log("res", res.data);
      setDirectionData(() => res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // driver initial coordinates
  useEffect(() => {
    getCurrentCoords();
  }, []);

  // get directional route
  useEffect(() => {
    if (driverCoords.latitude && source.latitude) {
      getDirectionRoute();
    }
  }, [driverCoords]);

  return (
    <div className="w-full h-[100%] bg-secondary flex gap-x-4">
      {!mapLoading && (
        <div className="h-full w-full">
          <ReactMapGL
            ref={mapRef}
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              latitude: driverCoords.latitude,
              longitude: driverCoords.longitude,
              zoom: 15,
            }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
          >
            <Markers destinationProps={source} sourceProps={driverCoords} />
            {directionData?.routes && (
              <MapboxRoute
                coordinates={directionData?.routes[0]?.geometry?.coordinates}
              />
            )}
            <NavigationControl position="bottom-right" />
          </ReactMapGL>
        </div>
      )}
    </div>
  );
};

export default Map;
