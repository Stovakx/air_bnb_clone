import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { defaultStyles } from "../constants/styles";
import { ListingGeo } from "../interface/listingGeo";
import { useRouter } from "expo-router";
import MapView from "react-native-map-clustering";
import Colors from "../constants/Colors";

interface Props {
  listings: any;
}

const InitialRegion = {
  latitude: 53.3584650887,
  longitude: 13.5072270096,
  latitudeDelta: 9,
  longitudeDelta: 9,
};
const ListingMap = ({ listings }: Props) => {
  const router = useRouter();

  const onMarkerSelected = (event: ListingGeo) => {
    router.push(`/listing/${event.properties.id}`);
  };

  //při napsání vlastního clusteru přepíšu jak bude zobrazován
  const renderCluster = (cluster: any) => {
    const { id, geometry, onPres, properties } = cluster;
    const points = properties.point_count;

    return (
      <Marker
        key={`cluster-${id}`}
        onPress={onPres}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
      >
       <View style={styles.marker}>
       <Text style={styles.markerText}>{points}</Text>
       </View>
      </Marker>
    );
  };

  return (
    <View style={defaultStyles.container}>
      <MapView
        animationEnabled={false}
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        initialRegion={InitialRegion}
        clusterColor={Colors.primary}
        renderCluster={renderCluster}
      >
        {listings.features.map((item: ListingGeo) => (
          <Marker
            key={item.properties.id}
            onPress={() => onMarkerSelected(item)}
            coordinate={{
              latitude: +item.properties.latitude,
              longitude: +item.properties.longitude,
            }}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>€ {item.properties.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  marker: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    elevation: 5,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerText: {
    color: "#FFF",
    fontSize: 14,
    fontFamily: "MontserratSemiBold",
  },
  locateBtn: {
    position: "absolute",
    top: 70,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
});

export default ListingMap;
