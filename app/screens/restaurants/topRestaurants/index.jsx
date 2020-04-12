import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Card, Image, Rating } from "react-native-elements";
import { firebaseApp } from "../../../utils/Firebase";
import Toast from "react-native-simple-toast";
import firebase from "firebase/app";
import "firebase/firestore";
import ListTopRestaurant from "../../../components/restaurants/rankingList/Index";

const db = firebase.firestore(firebaseApp);

const TopRestaurants = (props) => {
  const { navigation } = props;
  const [topRestaurants, setTopRestaurants] = useState([]);
  useEffect(() => {
    ((async) => {
      db.collection("restaurants")
        .orderBy("rating", "desc")
        .limit(5)
        .get()
        .then((response) => {
          const restaurantArrays = [];
          response.forEach((doc) => {
            let restaurant = doc.data();
            restaurant.id = doc.id;
            restaurantArrays.push(restaurant);
          });
          setTopRestaurants(restaurantArrays);
        })
        .catch((error) => {
          Toast.show("Error, por favor intente mas tarde");
        });
    })();
  }, []);
  return (
    <ScrollView>
      <View>
        {topRestaurants.length > 0 ? (
          <ListTopRestaurant navigation={navigation} listRestaurant={topRestaurants} />
        ) : (
          <Text>Cargando...</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default TopRestaurants;
