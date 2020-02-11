import React from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";

const MyAccount = () => {
  return (
    <View>
      <Avatar
        rounded
        source={{
          uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
        }}
      />
      <Text> Mi cuenta </Text>
    </View>
  );
};

export default MyAccount;
