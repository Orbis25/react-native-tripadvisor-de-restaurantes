import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import Toast from "react-native-simple-toast";
import * as firebase from "firebase";
import { readAuth } from "../../../utils/Api";

export const DisplayNameForm = props => {
  const [isLoading, setIsLoading] = useState(false);
  const { displayName, setIsVisibleModal, setReloadData } = props;
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);

  const update = () => {
    setError(null);
    if (!newDisplayName) {
      setError("El nombre de usuario no ha cambiado");
    } else {
      setIsLoading(true);
      const update = {
        displayName: newDisplayName
      };
      firebase
        .auth()
        .currentUser.updateProfile(update)
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
          setIsVisibleModal(false);
          Toast.show("Nombre actualizado");
        })
        .catch(() => {
          setIsLoading(false);
          Toast.show("Error al actualizar el nombre");
        });
    }
  };

  return (
    <View>
      <Text style={styles.title}>Cambiar nombre y apellidos</Text>
      <View>
        <Input
          placeholder="Nombre completo"
          containerStyle={styles.input}
          onChange={e => setNewDisplayName(e.nativeEvent.text)}
          defaultValue={displayName && displayName}
          rightIcon={<Icon type="font-awesome" name="user" color="#536DFE" />}
          errorMessage={error}
        />

        <Button
          title="Actualizar"
          containerStyle={styles.containerBtn}
          buttonStyle={styles.btn}
          loading={isLoading}
          onPress={update}
        />
      </View>
    </View>
  );
};

export const ChangeEmailForm = props => {
  const [isLoading, setIsLoading] = useState(false);
  const { email, setIsVisibleModal, setReloadData } = props;
  const [newEmail, setNewEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState({});

  const update = () => {
    setError({});
    if (!newEmail || email === newEmail) {
      setError({ email: "El correo no ha cambiado" });
    } else if (!password) {
      setError({ password: "La contraseña no ha cambiado" });
    } else {
      setIsLoading(true);

      readAuth(password)
        .then(() => {
          firebase
            .auth()
            .currentUser.updateEmail(newEmail)
            .then(() => {
              setIsLoading(false);
              setReloadData(true);
              setIsVisibleModal(false);
              Toast.show("Correo actualizado");
            })
            .catch(() => {
              setIsLoading(false);
              Toast.show("Error al actualizar el correo");
            });
        })
        .catch(() => {
          setIsLoading(false);
          setError({ password: "Contraseña incorrecta" });
        });
    }
  };

  return (
    <View>
      <Text style={styles.title}>Cambiar Correo</Text>
      <View>
        <Input
          placeholder="correo"
          containerStyle={styles.input}
          onChange={e => setNewEmail(e.nativeEvent.text)}
          defaultValue={email}
          rightIcon={<Icon type="font-awesome" name="at" color="#536DFE" />}
          errorMessage={error.email}
        />

        <Input
          placeholder="Contraseña"
          secureTextEntry={true}
          password={true}
          containerStyle={styles.input}
          onChange={e => setPassword(e.nativeEvent.text)}
          rightIcon={<Icon type="font-awesome" name="eye" color="#536DFE" />}
          errorMessage={error.password}
        />

        <Button
          title="Actualizar"
          containerStyle={styles.containerBtn}
          buttonStyle={styles.btn}
          loading={isLoading}
          onPress={update}
        />
      </View>
    </View>
  );
};

export const ChangePasswordForm = props => {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsVisibleModal } = props;
  const [password, setPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [repeatPassword, setRepeatPassword] = useState(null);

  const [error, setError] = useState({});

  const update = () => {
    setError({});
    if (!password) {
      setError({ password: "ingrese la contraseña" });
    } else if (!newPassword || password === newPassword) {
      setError({ newPassword: "la contraseña no ha cambiado" });
    } else if (newPassword != repeatPassword) {
      setError({ repeat: "Las contraseña no coinciden" });
    } else {
      setIsLoading(true);

      readAuth(password)
        .then(() => {
          firebase
            .auth()
            .currentUser.updatePassword(newPassword)
            .then(() => {
              setIsLoading(false);
              setIsVisibleModal(false);
              Toast.show("contraseña actualizada");
              firebase.auth().signOut();
            })
            .catch(e => {
              setIsLoading(false);
              Toast.show("Error al actualizar las contraseña");
            });
        })
        .catch(() => {
          setIsLoading(false);
          setError({ password: "Contraseña incorrecta" });
        });
    }
  };

  return (
    <View>
      <Text style={styles.title}>Contraseña</Text>
      <View>
        <Input
          placeholder="Contraseña Actual"
          secureTextEntry={true}
          password={true}
          containerStyle={styles.input}
          onChange={e => setPassword(e.nativeEvent.text)}
          rightIcon={<Icon type="font-awesome" name="eye" color="#536DFE" />}
          errorMessage={error.password}
        />

        <Input
          placeholder="Nueva Contraseña"
          secureTextEntry={true}
          password={true}
          containerStyle={styles.input}
          onChange={e => setNewPassword(e.nativeEvent.text)}
          rightIcon={<Icon type="font-awesome" name="eye" color="#536DFE" />}
          errorMessage={error.newPassword}
        />

        <Input
          placeholder="Repite la Nueva Contraseña"
          secureTextEntry={true}
          password={true}
          containerStyle={styles.input}
          onChange={e => setRepeatPassword(e.nativeEvent.text)}
          rightIcon={<Icon type="font-awesome" name="eye" color="#536DFE" />}
          errorMessage={error.repeat}
        />

        <Button
          title="Actualizar"
          containerStyle={styles.containerBtn}
          buttonStyle={styles.btn}
          loading={isLoading}
          onPress={update}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20
  },
  input: {
    marginBottom: 10,
    padding: 10
  },
  containerBtn: {
    display: "flex",
    alignContent: "center",
    alignItems: "center"
  },
  btn: {
    backgroundColor: "#536DFE",
    width: 120
  }
});
