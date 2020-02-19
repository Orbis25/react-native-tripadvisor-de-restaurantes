import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import * as firebase from 'firebase'
const UserLoggged = () => {
  return (
    <View>
      <Text>UserLoggged.....</Text>
      <Button title="Cerrar" onPress={() => firebase.auth().signOut()} />
    </View>
  );
};

export default UserLoggged;
