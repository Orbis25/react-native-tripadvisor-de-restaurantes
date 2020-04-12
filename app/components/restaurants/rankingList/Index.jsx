import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Card, Image, Rating, Icon } from "react-native-elements";
import * as firebase from "firebase";

const RankingList = (props) => {
  const { listRestaurant, navigation } = props;
  return (
    <FlatList
      data={listRestaurant}
      renderItem={(restaurant) => (
        <Restaurant navigation={navigation} restaurant={restaurant} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const Restaurant = (props) => {
  const { restaurant, navigation } = props;
  const { name, images, rating, description } = restaurant.item;
  const [imageRestaurant, setImageRestaurant] = useState(null);
  const [iconColor, setIconColor] = useState("#000");

  useEffect(() => {
    const image = images[0];
    firebase
      .storage()
      .ref(`restaurants-images/${image}`)
      .getDownloadURL()
      .then((response) => {
        setImageRestaurant(response);
      });
  }, []);

  useEffect(() => {
    if (restaurant.index == 0) {
      setIconColor("#EFB810");
    } else if (restaurant.index == 1) {
      setIconColor("#e3e4e5");
    } else if (restaurant.index == 2) {
      setIconColor("#cd7f32");
    }
  });

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Restaurant", { restaurant: restaurant.item })
      }
    >
      <Card containerStyle={styles.containerCard}>
        <Icon
          type="material-community"
          name="chess-queen"
          color={iconColor}
          size={30}
          containerStyle={styles.icon}
        />
        <Image
          source={{ uri: imageRestaurant }}
          resizeMode="cover"
          style={styles.image}
        />
        <View>
          <Text style={styles.title}>{name}</Text>
          <Rating
            style={styles.rating}
            imageSize={20}
            readonly
            startingValue={rating}
          />
        </View>
        <Text style={styles.description}>{description}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    margin: 5,
    padding: 5,
  },
  containerCard: {
    marginBottom: 0,
    borderWidth: 0,
  },
  rating: {
    position: "absolute",
    right: 0,
  },
  description: {
    color: "grey",
    marginTop: 0,
    textAlign: "justify",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    position: "absolute",
    top: -30,
    left: -30,
    zIndex: 1,
  },
});

export default RankingList;
