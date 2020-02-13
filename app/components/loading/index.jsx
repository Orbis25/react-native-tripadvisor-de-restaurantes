import React from "react";
import { View, StyleSheet, Text, ActivityIndicator, Image } from "react-native";
import { Overlay } from "react-native-elements";

const Loading = props => {
  const { isVisible, text } = props;
  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="#757575"
      overlayBackgroundColor="transparent"
      overlayStyle={style.overlay}
    >
      <View style={style.view}>
        <ActivityIndicator size="large" color="#3F51B5" />

        {text && <Text style={style.text}>{text}</Text>}
      </View>
    </Overlay>
  );
};

const style = StyleSheet.create({
  overlay: {
    backgroundColor: "#ffffff",
    borderColor: "#BDBDBD",
    borderWidth: 0
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#303F9F",
    textTransform: "uppercase",
    marginTop: 10
  }
});

export default Loading;
