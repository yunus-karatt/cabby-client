import { useSelector } from "react-redux";
import { rootState } from "../../interface/user/userInterface";
import { Marker } from "react-map-gl";
import { useEffect } from "react";
// import { useEffect } from "react";

const Markers = ({
  sourceProps,
  destinationProps,
  icon,
}: {
  sourceProps?: { latitude: number; longitude: number };
  destinationProps?: { latitude: number; longitude: number };
  icon?: boolean;
}) => {
  const { destination, source } = useSelector(
    (state: rootState) => state.routeCoordinates
  );


  return (
    <div>
      {destination.lat && destination.long && !destinationProps?.latitude && (
        <Marker latitude={destination.lat} longitude={destination.long} />
      )}

      {source.lat &&
        source.long &&
        !sourceProps?.latitude &&
        !destinationProps?.latitude && (
          <Marker latitude={source.lat} longitude={source.long} />
        )}

      {sourceProps?.latitude && sourceProps.longitude && (
        <Marker
          latitude={sourceProps.latitude}
          longitude={sourceProps.longitude}
        />
      )}

      {destinationProps?.latitude && destinationProps.longitude && (
        <Marker
          latitude={destinationProps.latitude}
          longitude={destinationProps.longitude}
        />
        // {/* </Marker> */}
      )}
    </div>
  );
};

export default Markers;
