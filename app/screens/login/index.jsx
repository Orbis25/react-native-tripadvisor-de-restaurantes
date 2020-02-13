import React from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import { Divider, Button } from "react-native-elements";
const Login = props => {
  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewContainer}>
        <Text>Login</Text>
        <GoToRegister router={props} />
      </View>
      <Divider style={styles.divider} />
      <View style={styles.viewContainer}>
        <Text>Login Facebook</Text>
      </View>
    </ScrollView>
  );
};

const GoToRegister = props => {
  const {
    router: {
      navigation: { navigate }
    }
  } = props;
  return (
    <Text style={styles.textRegister}>
      ¿Aún no tienes una cuenta? {"  "}
      <Text style={styles.btnRegister} onPress={() => navigate("register")}>
        Registrate
      </Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 170,
    marginTop: 20,
    borderRadius: 20
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40
  },
  divider: {
    marginBottom: 40,
    backgroundColor: "#BDBDBD",
    margin: 10
  },
  textRegister: {
    marginTop: 10,
    marginBottom: 10
  },
  btnRegister: {
    color: "#536DFE",
    fontWeight: "bold"
  }
});

export default Login;
