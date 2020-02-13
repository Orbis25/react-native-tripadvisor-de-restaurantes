import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const UserGuest = () => {
  const { navigate } = useNavigation();
  return (
    <ScrollView style={styles.viewBody}>
      <Image
        style={styles.img}
        source={require("../../../assets/img/profile.png")}
        resizeMode="contain"
      />
      <Text style={styles.text}>Consulta tu perfil en TuComidaRd 🍖🍗</Text>
      <Text style={styles.description}>
        Como describirias tu mejor restaurante? Busca y visualiza los mejores
        restaurantes de una forma sencilla y vota cual te ha gustado mas ademas
        comenta tu experiencia.
      </Text>
      <View style={styles.view}>
        <Button
          buttonStyle={styles.btn}
          containerStyle={styles.btnContainer}
          onPress={() => navigate("login")}
          title="Ir a mi perfil"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30
  },
  img: {
    height: 300,
    width: "100%",
    marginBottom: 40,
    borderRadius: 100
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10
  },
  description: {
    textAlign: "center",
    marginBottom: 20
  },
  btn: {
    backgroundColor: "#536DFE",
    borderRadius: 20
  },
  view: {
    flex: 1,
    alignItems: "center"
  },
  btnContainer: {
    width: "70%"
  }
});

export default UserGuest;
