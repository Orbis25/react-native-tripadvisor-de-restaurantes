import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import Toast from "react-native-simple-toast";
import { ValidateEmail } from "../../../utils/Validation";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoadign, setIsLoading] = useState(false);
  const { navigate } = useNavigation();
  const auth = async () => {
    if (!email || !pass) {
      Toast.show("Campos obligatorios");
    } else {
      if (!ValidateEmail(email)) { 
        Toast.show("Email invalido");
      } else {
        setIsLoading(true);
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, pass)
          .then(() => {
            navigate("myAccountScreen");
          })
          .catch(() => {
            Toast.show("Usuario incorrecto!");
          })
          .finally(() => setIsLoading(false));
      }
    }
  };

  return (
    <View style={styles.formContainer}>
      <Input
        containerStyle={styles.inputForm}
        placeholder="Correo electronico"
        onChange={r => setEmail(r.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-cummunity"
            name="email"
            iconStyle={styles.icon}
          />
        }
      />
      <Input
        containerStyle={styles.inputForm}
        secureTextEntry={hidePassword}
        password={hidePassword}
        onChange={r => setPass(r.nativeEvent.text)}
        placeholder="Contraseña"
        rightIcon={
          <Icon
            type="font-awesome"
            name={hidePassword ? "eye" : "eye-slash"}
            iconStyle={styles.icon}
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />
      <Button
        title="Iniciar Sesion"
        loading={isLoadign}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={() => auth()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10
  },
  inputForm: {
    width: "100%",
    marginBottom: 10
  },
  icon: {
    color: "#536DFE"
  },
  btn: {
    backgroundColor: "#536DFE"
  },
  btnContainer: {
    width: "100%"
  }
});

export default LoginForm;
