import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import ReactMapGL, { MapRef, Marker, NavigationControl } from "react-map-gl";
import MapboxRoute from "../user/MapboxRoute";
// import Markers from "../user/Markers";
import { DirectionsApiResponse } from "../../interface/common/common";
import { CurrentRideData } from "../../interface/user/userInterface";
// import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const UserMap = ({
  currentCoors,
  source,
  destination,
  directionData,
  currentRideData,
  driverCoors,
  rideStatus,
}: {
  currentCoors?: { latitude: number; longitude: number };
  source?: { latitude: number; longitude: number };
  destination?: { latitude: number; longitude: number };
  directionData?: DirectionsApiResponse;
  currentRideData?: CurrentRideData;
  driverCoors?: { latitude: number; longitude: number };
  rideStatus: null | "started" | "ended";
}) => {
  const mapRef = useRef<MapRef | null>(null);

  // change map on source selection of user
  useEffect(() => {
    if (source?.latitude && source.longitude) {
      mapRef?.current?.flyTo({
        center: [source?.longitude, source?.latitude],
        duration: 2500,
      });
    }
  }, [source]);

  // change map on destination selection of user
  useEffect(() => {
    if (destination) {
      mapRef.current?.flyTo({
        center: [destination?.longitude, destination?.latitude],
        duration: 2500,
      });
    }
  }, [destination]);

  // set driver position
  // useEffect(() => {
  //   if (currentRideData?.driverCoordinates.latitude) {
  //     mapRef.current?.flyTo({
  //       center: [
  //         currentRideData?.driverCoordinates.longitude,
  //         currentRideData?.driverCoordinates.latitude,
  //       ],
  //       duration: 2500,
  //     });

  //   }
  // }, [currentRideData]);

  // update map with driver live coors
  useEffect(() => {
    if (driverCoors?.latitude) {
      mapRef.current?.flyTo({
        center: [driverCoors?.longitude, driverCoors?.latitude],
        duration: 2500,
      });
    }
  }, [driverCoors]);

  return (
    <div className="w-full h-[100%] bg-secondary flex gap-x-4">
      <div className="h-full w-full">
        <ReactMapGL
          ref={mapRef}
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            latitude: currentCoors?.latitude,
            longitude: currentCoors?.longitude,
            zoom: 15,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          {/* initial load marker */}
          {currentCoors && !source?.latitude && (
            <Marker
              latitude={currentCoors?.latitude}
              longitude={currentCoors?.longitude}
            />
          )}

          {source?.latitude && source.longitude && !driverCoors?.latitude && (
            <Marker latitude={source.latitude} longitude={source.longitude} />
          )}
          {destination?.latitude &&
            destination.longitude &&
            !driverCoors?.latitude && (
              <Marker
                latitude={destination.latitude}
                longitude={destination.longitude}
              />
            )}
          {driverCoors?.latitude && driverCoors.longitude && (
            <Marker
              latitude={driverCoors.latitude}
              longitude={driverCoors.longitude}
            />
          )}
          {destination?.latitude && source?.longitude && (
            <Marker
              latitude={
                rideStatus === "started" && rideStatus != null
                  ? destination?.latitude
                  : source?.latitude
              }
              longitude={
                rideStatus != null && rideStatus === "started"
                  ? destination?.longitude
                  : source?.longitude
              }
            />
          )}
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

export default UserMap;
