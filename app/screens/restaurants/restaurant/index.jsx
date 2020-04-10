import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Rating, Icon, Button } from "react-native-elements";
import ImagesRestaurantCarousel from "../../../components/restaurants/Carousel";
import Map from "../../../components/shared/map";
import ListReview from "../../../components/restaurants/listTreeView";
import Toast from "react-native-simple-toast";

//import * as firebase from "firebase";
import { firebaseApp } from "../../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

const Restaurant = (props) => {
  const {
    route: { params },
    navigation,
  } = props;
  const { restaurant } = params;
  const { images, location, address, id } = restaurant;
  const [ImagesRestaurant, setImagesRestaurant] = useState([]);
  const [rating, setRating] = useState(restaurant.rating);
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const arrayUrl = [];
    (async () => {
      await Promise.all(
        images.map(async (image) => {
          await firebase
            .storage()
            .ref(`restaurants-images/${image}`)
            .getDownloadURL()
            .then((result) => {
              arrayUrl.push(result);
            });
        })
      );
      setImagesRestaurant(arrayUrl);
    })();
  }, []);

  useEffect(() => {
    let idUser = firebase.auth().currentUser;
    console.log(idUser);
    if (idUser == null) {
    } else {
      idUser = idUser.uid;
      db.collection("favorites")
        .where("idRestaurant", "==", id)
        .where("idUser", "==", idUser)
        .get()
        .then((response) => {
          if (response.docs.length === 1) {
            setIsFavorite(true);
          }
        });
    }
  }, []);

  const addToFavorite = () => {
    const payload = {
      idUser: firebase.auth().currentUser.uid,
      idRestaurant: id,
    };
    db.collection("favorites")
      .add(payload)
      .then(() => {
        setIsFavorite(true);
        Toast.show("Agregado a favoritos");
      })
      .catch(() => {
        Toast.show("Error intente de nuevo");
      });
  };

  const removeFavorite = () => {
    db.collection("favorites")
      .where("idRestaurant", "==", id)
      .where("idUser", "==", firebaseApp.auth().currentUser.uid)
      .get()
      .then((response) => {
        response.forEach((doc) => {
          const idFavorite = doc.id;
          db.collection("favorites")
            .doc(idFavorite)
            .delete()
            .then(() => {
              setIsFavorite(false);
              Toast.show("Eliminado de favoritos");
            })
            .catch(() => {
              Toast.show("Error intente de nuevo");
            });
        });
      });
  };

  return (
    <ScrollView>
      {firebase.auth().currentUser != null && (
        <View style={styles.favoriteIcon}>
          {isFavorite ? (
            <Icon
              name="heart"
              onPress={() => removeFavorite()}
              type="material-community"
              size={30}
              color="#ffffff"
            />
          ) : (
            <Icon
              name="heart-outline"
              onPress={() => addToFavorite()}
              type="material-community"
              size={30}
              color="#ffffff"
            />
          )}
        </View>
      )}
      <ImagesRestaurantCarousel images={ImagesRestaurant} />
      <RestaurantDescription restaurant={restaurant} rating={rating} />
      <Card containerStyle={styles.cardContainer} title="Ubicación">
        <Text style={{ textAlign: "center", marginBottom: 10 }}>{address}</Text>
        <Map location={location} name={address} heigth={150} />
      </Card>
      <ListReview
        navigation={navigation}
        idRestaurant={id}
        setRating={setRating}
      />
    </ScrollView>
  );
};

const RestaurantDescription = (props) => {
  const { name, description, address } = props.restaurant;
  const { rating } = props;
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
    textAlign: "center",
  },
  textDescription: {
    color: "gray",
  },
  body: {
    margin: 10,
  },
  location: {
    marginBottom: 10,
    marginRight: 5,
  },
  locationContainer: {
    flexDirection: "row",
  },
  btnLocation: {
    borderRadius: 50,
    width: 150,
    alignContent: "center",
  },
  btnLocationContainer: {
    borderRadius: 50,
    alignContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    borderRadius: 20,
    marginBottom: 10,
  },
  favoriteIcon: {
    marginTop: 10,
    zIndex: 999,
    position: "absolute",
    left: "90%",
  },
});

export default Restaurant;
