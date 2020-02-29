import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  YellowBox,
  ActivityIndicator
} from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-simple-toast";

import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

const InfoUser = props => {
  const {
    user: { displayName, photoURL, uid, email, phoneNumber },
    setReloadData
  } = props;

  const [isLoading, setIsLoading] = useState(false);

  const changeAvatar = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const cameraResult = resultPermission.permissions.cameraRoll.status;
    if (cameraResult === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
      if (result.cancelled) {
        Toast.show("Cancelada.");
      } else {
        setIsLoading(true);
        await uploadImage(result.uri, uid)
          .then(() => {
            Toast.show("Imagen Subida correctamente");
            updatePhotoUrl(uid);
          })
          .catch(() => {
            Toast.show("Ocurrio un error al subir la imagen");
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    } else {
    }
  };

  const uploadImage = async (uri, nameImage) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref()
      .child(`avatars/${nameImage}`);
    return ref.put(blob);
  };

  const updatePhotoUrl = uid => {
    firebase
      .storage()
      .ref(`avatars/${uid}`)
      .getDownloadURL()
      .then(async result => {
        const update = {
          photoURL: result
        };
        await firebase.auth().currentUser.updateProfile(update);
        setReloadData(true);
      })
      .catch(() => Toast.show("error al recuperar el avatart"));
  };

  return (
    <View style={styles.content}>
      {!isLoading ? (
        <Avatar
          containerStyle={styles.avatar}
          rounded
          source={{
            uri: photoURL
              ? photoURL
              : `http://api.adorable.io/avatars/285/${displayName}`
          }}
          size={110}
          showEditButton
          onEditPress={changeAvatar}
        />
      ) : (
        <ActivityIndicator
          size="large"
          style={styles.ActivityIndicator}
          color="#FFFFFF"
        />
      )}
      <View>
        <Text style={styles.displayName}>
          {displayName ? displayName : "Anónimo"}
        </Text>
        <Text style={styles.displayName}>
          {email ? email : "From Facebook"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#536DFE",
    height: 150
  },
  avatar: {
    marginRight: 20
  },
  displayName: {
    fontWeight: "bold",
    color: "white"
  },
  ActivityIndicator: {
    marginRight: 20
  }
});

export default InfoUser;
