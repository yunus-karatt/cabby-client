import Navbar from "../../components/user/Navbar";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
// import { useEffect, useRef, useState } from "react";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import { SelectDestination } from "../../components/user/SelectDestination";
import Markers from "../../components/user/Markers";
import { useSelector } from "react-redux";
import { rootState } from "../../interface/user/userInterface";
import axios from "axios";
import MapboxRoute from "../../components/user/MapboxRoute";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const SearchRide = () => {
  const [location, setLocation] = useState({
    lng: 0,
    lat: 0,
  });
  const [mapLoaded, setMapLoaded] = useState(false);

  const markRef = useRef<mapboxgl.Marker>(null);
  const mapRef = useRef<any>(null);
  const [directionData, setDirectionData] = useState<any>();
  const { source, destination } = useSelector(
    (state: rootState) => state.routeCoordinates
  );

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation((prev) => ({
        ...prev,
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      }));
      setMapLoaded(true);
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);
  useEffect(() => {
    if (source.lat && source.long) {
      mapRef?.current?.flyTo({
        center: [source.long, source.lat],
        duration: 2500,
      });
    }
  }, [source]);
  useEffect(() => {
    if (destination.lat && destination.long) {
      mapRef?.current?.flyTo({
        center: [destination.long, destination.lat],
        duration: 2500,
      });
    }
    if (destination.lat && destination.long && source.lat && source.long) {
      getDirectionRoute();
    }
  }, [destination]);
  const getDirectionRoute = async () => {
    const res =
      await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${
        source.long
      },${source.lat};${destination.long},${
        destination.lat
      }?overview=full&geometries=geojson
&access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`);
    setDirectionData(res.data);
  };
  return (
    <>
      <Navbar />
      <div className="bg-secondary w-[100%] h-[100%] flex flex-col md:flex-row gap-x-3 p-6 gap-y-6">
        <SelectDestination />
        <div className="w-full bg-white h-[100vh]  rounded-lg">
          {mapLoaded && (
            <ReactMapGL
              ref={mapRef}
              mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
              initialViewState={{
                longitude: location.lng,
                latitude: location.lat,
                zoom: 15,
              }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
            >
              {!destination.lat &&
                !destination.long &&
                !source.lat &&
                !source.long && (
                  <Marker
                    ref={markRef}
                    latitude={location.lat}
                    longitude={location.lng}
                    draggable
                    onDragEnd={(e) =>
                      setLocation(() => ({
                        lat: e.lngLat.lat,
                        lng: e.lngLat.lng,
                      }))
                    }
                  />
                )}
              <Markers />
              {directionData?.routes ? (
                <MapboxRoute
                  coordinates={directionData?.routes[0]?.geometry?.coordinates}
                />
              ) : null}
              <NavigationControl position="bottom-right" />
              <GeolocateControl
                position="top-left"
                trackUserLocation
                onGeolocate={(e) =>
                  setLocation(() => ({
                    lat: e.coords.latitude,
                    lng: e.coords.longitude,
                  }))
                }
              />
            </ReactMapGL>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchRide;
