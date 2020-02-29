import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import * as firebase from "firebase";
import UserInfo from "../../components/account/infoUser";
import UserOtions from "../../components/account/options";

const UserLoggged = () => {
  const [userInfo, setUserInfo] = useState({});
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.providerData[0]);
    })();
    setReloadData(false);
  }, [reloadData]);

  return (
    <View style={styles.viewUserInfo}>
      <UserInfo setReloadData={setReloadData} user={userInfo} />
      <UserOtions setReloadData={setReloadData} user={userInfo} />
      <Button
        buttonStyle={styles.btnCloseSesion}
        titleStyle={styles.textBtn}
        title="Salir"
        onPress={() => firebase.auth().signOut()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%"
  },
  btnCloseSesion: {
    backgroundColor: "#fff",
    borderTopWidth: 0,
    borderWidth: 1,
    borderRadius: 0,
    borderColor: "#e3e3e4",
    height: 45
  },
  textBtn: {
    color: "#536DFE",
    textAlign: "right"
  }
});

export default UserLoggged;
