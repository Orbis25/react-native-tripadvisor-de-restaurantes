import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import {
  Button,
  Avatar,
  Rating,
  Text,
  Icon,
  ListItem
} from "react-native-elements";
import { firebaseApp } from "../../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

const ListReviews = props => {
  const user = firebase.auth().currentUser;
  const { navigation, idRestaurant, setRating } = props;
  const [reviews, setReviews] = useState([]);
  const [reviewsReload, setReviewReload] = useState(false);
  // const []
  useEffect(() => {
    (async () => {
      const resultReview = [];
      const arrayRatiny = [];

      db.collection("reviews")
        .where("idRestaurant", "==", idRestaurant)
        .get()
        .then(response => {
          response.forEach(doc => {
            const review = doc.data();
            resultReview.push(review);
            arrayRatiny.push(review.rating);
          });
          let numSum = 0;
          //calculate media
          arrayRatiny.map(value => {
            numSum += value;
          });
          const countRating = arrayRatiny.length;
          const resultRating = numSum / countRating;
          const resultRatingFinish = resultRating ? resultRating : 0;
          
          setReviews(resultReview);
          setRating(resultRatingFinish);
        });
    })();
      setReviewReload(false);

  }, [reviewsReload]);

  return (
    <View>
      {user && (
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
              idRestaurant: idRestaurant,
              setReviewReload: setReviewReload
            })
          }
        ></Button>
      )}

      <FlatList
        data={reviews}
        renderItem={props => <Comment review={props} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const Comment = props => {
  const { item, index } = props.review;
  const { avatar, comment, createdAt, rating } = item;
  const createDate = new Date(createdAt.seconds * 1000);
  return (
    <ListItem
      key={index}
      leftAvatar={{ source: { uri: avatar } }}
      title={
        <View style={styles.titleComment}>
          <Text>{String(comment)}</Text>
          <Rating
            style={styles.commentRating}
            readonly
            minValue={1}
            imageSize={10}
            startingValue={rating}
          />
        </View>
      }
      subtitle={`${createDate.getDate()}/${createDate.getMonth() +
        1}/${createDate.getFullYear()}`}
    />
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
  },
  titleComment: {
    flexDirection: "row"
  },
  commentRating: {
    marginLeft: 10,
    marginTop: 5
  }
});

export default ListReviews;
