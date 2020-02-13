import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon, Input, Button } from "react-native-elements";

const RegisterForm = () => {
  const Register = () => {};

  return (
    <View style={styles.formContainer} behavior="padding" enabled>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputForm}
        onChange={() => console.log("ho")}
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
        secureTextEntry={true}
        password={true}
        containerStyle={styles.inputForm}
        onChange={() => console.log("ho")}
        rightIcon={
          <Icon type="material-cummunity" name="lock" iconStyle={styles.icon} />
        }
      />
      <Input
        placeholder="Repetir contraseña"
        secureTextEntry={true}
        password={true}
        containerStyle={styles.inputForm}
        onChange={() => console.log("ho")}
        rightIcon={
          <Icon type="material-cummunity" name="lock" iconStyle={styles.icon} />
        }
      />
      <Button
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        title="Unirse"
      ></Button>
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
