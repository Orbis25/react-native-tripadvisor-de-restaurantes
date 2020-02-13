import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegisterForm from "../../components/account/registerForm";
const Register = () => {
  return (
    <KeyboardAwareScrollView>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require("../../../assets/img/logo.png")}
      />
      <View style={styles.viewForm}>
        <Text style={styles.title}>Formulario de Registro</Text>
        <RegisterForm />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 170,
    marginTop: 20,
    borderRadius:20
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    marginTop: 10
  }
});

export default Register;
