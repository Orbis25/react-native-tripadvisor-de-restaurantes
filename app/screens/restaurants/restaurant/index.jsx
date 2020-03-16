import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Rating, Icon, Button } from "react-native-elements";
import ImagesRestaurantCarousel from "../../../components/restaurants/Carousel";
import Map from "../../../components/shared/map";
import * as firebase from "firebase";
import ListReview from "../../../components/restaurants/listTreeView";
const Restaurant = props => {
  const {
    route: { params },
    navigation
  } = props;
  const { restaurant } = params;
  const { images, location, address, id } = restaurant;
  const [ImagesRestaurant, setImagesRestaurant] = useState([]);
  useEffect(() => {
    const arrayUrl = [];
    (async () => {
      await Promise.all(
        images.map(async image => {
          await firebase
            .storage()
            .ref(`restaurants-images/${image}`)
            .getDownloadURL()
            .then(result => {
              arrayUrl.push(result);
            });
        })
      );
      setImagesRestaurant(arrayUrl);
    })();
  }, []);

  return (
    <ScrollView>
      <ImagesRestaurantCarousel images={ImagesRestaurant} />
      <RestaurantDescription restaurant={restaurant} />
      <Card containerStyle={styles.cardContainer} title="Ubicación">
        <Text style={{ textAlign: "center", marginBottom: 10 }}>{address}</Text>
        <Map location={location} name={address} heigth={150} />
      </Card>
      <ListReview navigation={navigation} idRestaurant={id} />
    </ScrollView>
  );
};

const RestaurantDescription = props => {
  const { name, description, address, rating } = props.restaurant;
  return (
    <Card
      containerStyle={styles.cardContainer}
      style={styles.card}
      title={name}
    >
      <Rating readonly startingValue={rating} imageSize={25} />
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.locationContainer}>
            <Text style={styles.location}>{address}</Text>
            <Icon name="google-maps" type="material-community" size={17} />
          </View>
          <Text style={styles.textDescription}>{description}</Text>
        </View>
      </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 10,
    textAlign: "center"
  },
  textDescription: {
    color: "gray"
  },
  body: {
    margin: 10
  },
  location: {
    marginBottom: 10,
    marginRight: 5
  },
  locationContainer: {
    flexDirection: "row"
  },
  btnLocation: {
    borderRadius: 50,
    width: 150,
    alignContent: "center"
  },
  btnLocationContainer: {
    borderRadius: 50,
    alignContent: "center",
    alignItems: "center"
  },
  cardContainer: {
    borderRadius: 20,
    marginBottom: 10
  }
});

export default Restaurant;
