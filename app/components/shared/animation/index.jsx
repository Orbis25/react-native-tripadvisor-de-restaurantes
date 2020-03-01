import React from "react";
import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";

const Animation = props => {
  const { file } = props;
  return <LottieView loop style={styles.lottieView} autoPlay source={file} />;
};

export default Animation;

const styles = StyleSheet.create({
  lottieView: {
    paddingTop: 20,
    width: "auto"
  }
});
