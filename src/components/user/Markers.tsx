import { useSelector } from "react-redux";
import { rootState } from "../../interface/user/userInterface";
import { Marker } from "react-map-gl";

const Markers = ({
  sourceProps,
  destinationProps,
  // icon,
}: {
  sourceProps?: { latitude: number; longitude: number };
  destinationProps?: { latitude: number; longitude: number };
  // icon?: boolean;
}) => {
  const { destination, source } = useSelector(
    (state: rootState) => state.routeCoordinates
  );


  return (
    <div>
      {destination.latitude && destination.longitude && !destinationProps?.latitude && (
        <Marker latitude={destination.latitude} longitude={destination.longitude} />
      )}

      {source.latitude &&
        source.longitude &&
        !sourceProps?.latitude &&
        !destinationProps?.latitude && (
          <Marker latitude={source.latitude} longitude={source.longitude} />
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
