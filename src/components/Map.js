import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={5}
      defaultCenter={{ lat: 29.758035, lng: -95.367947 }}
    >
      {props.isMarkerShown && (
        <Marker position={{ lat: props.lat, lng: props.lon }} />
      )}
    </GoogleMap>
  ))
);

export default Map;
