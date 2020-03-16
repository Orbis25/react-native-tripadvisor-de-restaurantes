import React from "react";
import MapView from "react-native-maps";
import openMap from "react-native-open-maps";
const Map = props => {
  const { location, heigth, name } = props;
  const openAppMap = () => {
    openMap({
      longitude: location.longitude,
      latitude: location.latitude,
      zoom: 19,
      query: name
    });
  };
  return (
    <MapView
      style={{ width: "100%", height: heigth }}
      initialRegion={location}
      onPress={openAppMap}
    >
      <MapView.Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude
        }}
      />
    </MapView>
  );
};

export default Map;
