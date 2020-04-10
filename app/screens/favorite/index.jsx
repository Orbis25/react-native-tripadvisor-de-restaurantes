import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Image, Icon } from "react-native-elements";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import Toast from "react-native-simple-toast";
import UserNoLogged from "../userGuest";

const db = firebase.firestore(firebaseApp);

const Favorites = (props) => {
  const { navigation } = props;
  const [restaurants, setRestaurants] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  navigation.addListener("focus", () => {
    setReloadData(true);
  });

  useEffect(() => {
    if (userLogged) {
      const idUser = firebase.auth().currentUser.uid;
      db.collection("favorites")
        .where("idUser", "==", idUser)
        .get()
        .then((response) => {
          const idRestaurantsArrays = [];
          response.forEach((doc) => {
            idRestaurantsArrays.push(doc.data().idRestaurant);
          });
          getDataRestaurant(idRestaurantsArrays).then((response) => {
            const restaurantsx = [];
            response.forEach((doc) => {
              let restaurant = doc.data();
              restaurant.id = doc.id;
              restaurantsx.push(restaurant);
            });
            setRestaurants(restaurantsx);
          });
        });
      setReloadData(false);
    }
  }, [reloadData]);

  const getDataRestaurant = (idRestaurantsArray) => {
    const restaurantArray = [];
    idRestaurantsArray.forEach((id) => {
      const result = db.collection("restaurants").doc(id).get();
      restaurantArray.push(result);
    });
    return Promise.all(restaurantArray);
  };

  if (!userLogged) {
    return <UserNoLogged />;
  } else {
    return (
      <View style={styles.ViewBody}>
        {restaurants.length === 0 && (
          <View>
            <Icon
              containerStyle={styles.iconNotItem}
              type="font-awesome"
              name="heart"
              color="#536DFE"
              size={80}
            />
            <Text style={styles.noItemText}>No Tienes favoritos</Text>
          </View>
        )}

        {restaurants ? (
          <FlatList
            data={restaurants}
            renderItem={(restaurant) => (
              <Restaurant
                restaurant={restaurant}
                setReloadData={setReloadData}
                navigation={navigation}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View style={styles.ContainerActivityIndicator}>
            <ActivityIndicator size="large" />
            <Text style={styles.TextLoading}>Cargando Restaurantes</Text>
          </View>
        )}
      </View>
    );
  }
};

const Restaurant = (props) => {
  const { restaurant, navigation, setReloadData } = props;
  const { name, images, id } = restaurant.item;
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    const image = images[0];
    firebase
      .storage()
      .ref(`restaurants-images/${image}`)
      .getDownloadURL()
      .then((result) => {
        setImageUrl(result);
      });
  }, []);

  const remove = (id) => {
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
              Toast.show("Eliminado de favoritos");
              setReloadData(true);
            })
            .catch(() => {
              Toast.show("Error intente de nuevo");
            });
        });
      });
  };

  return (
    <View style={styles.restaurant}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Restaurant", { restaurant: restaurant.item })
        }
      >
        <Image
          resizeMode="cover"
          source={{ uri: imageUrl }}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator color="#fff" />}
        />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.textName}>{name}</Text>
        <Icon
          type="material-community"
          name="heart"
          color="#536DFE"
          size={30}
          containerStyle={styles.favorites}
          onPress={() => remove(id)}
          underlayColor="transparent"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ContainerActivityIndicator: {
    margin: 10,
  },
  TextLoading: {
    textAlign: "center",
    marginTop: 10,
  },
  ViewBody: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  restaurant: {
    margin: 10,
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    marginTop: -30,
    backgroundColor: "#ffffff",
  },
  textName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  favorites: {
    marginTop: -35,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 100,
  },
  noItemText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 20,
  },
  noUser: {
    textAlign: "center",
  },
  iconNotItem: {
    marginTop: 100,
  },
});

export default Favorites;
