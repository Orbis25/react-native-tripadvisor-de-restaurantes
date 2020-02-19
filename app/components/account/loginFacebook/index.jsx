import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SocialIcon } from "react-native-elements";
import { FacebookApi } from "../../../utils/Social";
import * as firebase from "firebase";
import * as facebook from "expo-facebook";
import Toast from "react-native-simple-toast";
import { useNavigation } from "@react-navigation/native";

const LoginFacebook = () => {
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();
  const auth = async () => {
    setLoading(true);
    await facebook.initializeAsync(FacebookApi.application_id);
    const { type, token } = await facebook.logInWithReadPermissionsAsync({
      permissions: FacebookApi.permissions
    });
    if (type === "success") {
      const credentials = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase
        .auth()
        .signInWithCredential(credentials)
        .then(() => {
          navigate("myAccountScreen");
        })
        .catch(() => {
          Toast.show("error intente de nuevo");
        })
        .finally(() => setLoading(false));
    } else if (type === "cancel") {
      Toast.show("Operación cancelada");
    } else {
      Toast.show("intente de nuevo , error desconocido");
    }
  };
  return (
    <View>
      <SocialIcon
        title={loading ? " " : "Inicia con facebook"}
        style={styles.btnFacebook}
        button
        type="facebook"
        loading={loading}
        onPress={() => auth()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnFacebook: {}
});

export default LoginFacebook;
