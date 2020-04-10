import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AirbnbRating, Rating, Input, Button } from "react-native-elements";
import Toast from "react-native-simple-toast";
import { firebaseApp } from "../../../utils/Firebase";
import firebase from "firebase";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);
const ReviewForm = props => {
  const {
    navigation,
    route: {
      params: { idRestaurant, setReviewReload }
    }
  } = props;
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addReview = () => {
    if (rating === null || rating < 1) {
      Toast.show("Por favor indica una puntuación");
    } else if (comment === null || String(comment) === "") {
      Toast.show("Indica un comentario");
    } else {
      setIsLoading(true);
      const user = firebase.auth().currentUser;
      const payload = {
        idUser: user.uid,
        avatar: user.photoURL,
        idRestaurant: idRestaurant,
        comment: comment,
        rating: rating,
        createdAt: new Date()
      };
      db.collection("reviews")
        .add(payload)
        .then(() => {
          updateRestaurant();
        })
        .catch(() => {
          Toast.show("Intente de nuevo");
          setIsLoading(false);
        });
    }
  };

  const updateRestaurant = () => {
    const restaurantRef = db.collection("restaurants").doc(idRestaurant);
    restaurantRef.get().then(response => {
      const restaurantData = response.data();
      const ratingTotal = restaurantData.ratingTotal + rating;
      const quantityVoting = restaurantData.quantityVoting + 1;
      const ratingResult = ratingTotal / quantityVoting;
      restaurantRef
        .update({
          rating: ratingResult,
          ratingTotal,
          quantityVoting
        })
        .then(() => {
          setReviewReload(true);
          navigation.goBack();
        })
        .catch(() => {
          Toast.show(
            "Ocurrio un error actualizando el restaurante intente de nuevo"
          );
          setIsLoading(false);
        });
    });
  };

  return (
    <View style={styles.viewBody}>
      <View style={styles.viewRating}>
        <AirbnbRating
          count={5}
          reviews={["Pesimo", "Deficiente", "Normal", "Muy bueno", "Excelente"]}
          defaultRating={1}
          size={30}
          onFinishRating={value => setRating(value)}
        />
      </View>
      <Input
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
        label="Deja tu comentario aqui"
        multiline={true}
        onChange={e => setComment(e.nativeEvent.text)}
      />
      <Button
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        title="Enviar Opinión"
        loading={isLoading}
        onPress={() => addReview()}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  viewRating: {
    height: 110,
    backgroundColor: "#f2f2f2"
  },
  btn: {
    width: 200,
    borderRadius: 20
  },
  btnContainer: {
    alignContent: "center",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 20
  },
  input: {
    width: "100%",
    height: 100,
    padding: 0,
    margin: 0
  },
  inputContainer: {
    marginTop: 20,
    borderWidth: 0
  }
});

export default ReviewForm;
