import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Button, Avatar, Rating, Icon } from "react-native-elements";

const ListReviews = props => {
  const { navigation, idRestaurant } = props;
  return (
    <View>
      <Button
        buttonStyle={styles.btnReview}
        titleStyle={styles.btnTitleAddReview}
        title="Dar reseña"
        icon={{
          type: "material-community",
          name: "plus",
          color: "#000000"
        }}
        onPress={() =>
          navigation.navigate("AddReviewRestaurant", {
            idRestaurant: idRestaurant
          })
        }
      ></Button>
      <Text style={styles.textCenter}>Lista de comentarios</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  btnReview: {
    backgroundColor: "transparent"
  },
  btnTitleAddReview: {
    color: "#044a04"
  },
  textCenter: {
    textAlign: "center"
  }
});

export default ListReviews;
