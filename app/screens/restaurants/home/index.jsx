import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import ActionButton from "react-native-action-button";
import { colors } from "../../../utils/shared.json";
import * as firebase from "firebase";
import { firebaseApp } from "../../../utils/Firebase";
import "firebase/firestore";
import RestaurantList from "../../../components/restaurants/list";

const db = firebase.firestore(firebaseApp);
const Restaurants = props => {
  const {
    navigation: { navigate }
  } = props;

  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [startRestaurants, setStartRestaurants] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [isReloadRestaurant, setIsReloadRestaurant] = useState(false);
  const restaurantLimit = 8;
  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []);

  useEffect(() => {
    db.collection("restaurants")
      .get()
      .then(snap => {
        setTotalRestaurants(snap.size);
      });

    (async () => {
      const resultRestaurants = [];
      const restaurants = db
        .collection("restaurants")
        .orderBy("createAt", "desc")
        .limit(restaurantLimit);

      await restaurants.get().then(response => {
        setStartRestaurants(response.docs[response.docs.length - 1]);
        response.forEach(doc => {
          let restaurant = doc.data();
          restaurant.id = doc.id;
          resultRestaurants.push({ restaurant });
        });
        setRestaurants(resultRestaurants);
      });
    })();
    setIsReloadRestaurant(false);
  }, [isReloadRestaurant]);

  const handlerLoadMore = async () => {
    const resutlRestaurants = [];
    restaurants.length < totalRestaurants && setIsLoading(true);
    const restaurantsDb = db
      .collection("restaurants")
      .orderBy("createAt", "desc")
      .startAfter(startRestaurants.data().createAt)
      .limit(restaurantLimit);
    await restaurantsDb.get().then(result => {
      if (result.docs.length > 0) {
        setStartRestaurants(result.docs[result.docs.length - 1]);
      } else {
        setIsLoading(false);
      }

      result.forEach(doc => {
        let restaurant = doc.data();
        restaurant.id = doc.id;
        resutlRestaurants.push({ restaurant });
      });
      setRestaurants([...restaurants, ...resutlRestaurants]);
    });
  };

  return (
    <View style={styles.viewBody}>
      <RestaurantList
        restaurants={restaurants}
        handlerLoadMore={handlerLoadMore}
        isLoading={isLoading}
        navigate={navigate}
      />
      {user && (
        <AddRestaurantButton
          navigate={navigate}
          setIsReloadRestaurant={setIsReloadRestaurant}
        />
      )}
    </View>
  );
};

const AddRestaurantButton = props => {
  const { navigate, setIsReloadRestaurant } = props;
  return (
    <ActionButton
      buttonColor={colors.primary}
      onPress={() => navigate("AddRestaurants", { setIsReloadRestaurant })}
      style={styles.actionButton}
    />
  );
};

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  actionButton: {
    marginLeft: 0,
    padding: 0
  }
});

export default Restaurants;
