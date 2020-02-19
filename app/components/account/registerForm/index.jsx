import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Icon, Input, Button, Text } from "react-native-elements";
import { ValidateEmail } from "../../../utils/Validation";
import Toast from "react-native-simple-toast";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

const RegisterForm = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const { navigate } = useNavigation();

  const register = async () => {
    if (!email || !password || !repeat) {
      Toast.show("Los campos son obligatorios");
    } else {
      if (!ValidateEmail(email)) {
        Toast.show("Correo invalido");
      } else {
        if (password !== repeat) {
          Toast.show("Las contraseñas no coinciden");
        } else {
          setIsCreatingAccount(true);
          await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              navigate("myAccountScreen");
            })
            .catch(() => {
              Toast.show("error al crear la cuenta intentelo mas tarde");
            })
            .finally(() => setIsCreatingAccount(false));
        }
      }
    }
  };

  return (
    <View style={styles.formContainer} behavior="padding" enabled>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputForm}
        onChange={e => setEmail(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-cummunity"
            name="email"
            iconStyle={styles.icon}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        secureTextEntry={hidePassword}
        password={hidePassword}
        containerStyle={styles.inputForm}
        onChange={e => setPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="font-awesome"
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? "eye" : "eye-slash"}
            iconStyle={styles.icon}
          />
        }
      />
      <Input
        placeholder="Repetir contraseña"
        secureTextEntry={hideConfirmPassword}
        password={hideConfirmPassword}
        containerStyle={styles.inputForm}
        onChange={e => setRepeat(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="font-awesome"
            name={hideConfirmPassword ? "eye" : "eye-slash"}
            onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
            iconStyle={styles.icon}
          />
        }
      />
      <Button
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        title="Unirse"
        loading={isCreatingAccount}
        onPress={register}
      ></Button>
      {isCreatingAccount && (
        <Text>Espere un momento estamos Creando su cuenta......</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 5
  },
  icon: {
    color: "#536DFE"
  },
  btnContainer: {
    marginTop: 10,
    marginBottom: 10,
    width: "80%"
  },
  btn: {
    borderRadius: 50,
    backgroundColor: "#536DFE"
  }
});

export default RegisterForm;
