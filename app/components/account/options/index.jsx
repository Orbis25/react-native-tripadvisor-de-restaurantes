import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import Modal from "../../shared/modal";
import {
  ChangeEmailForm,
  DisplayNameForm,
  ChangePasswordForm
} from "../formsOptions";

const Options = props => {
  const { user, setReloadData } = props;
  const [isVibleModal, setIsVisibleModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const list = [
    {
      title: "Cambiar Nombre y Apellidos",
      iconType: "font-awesome",
      iconNameLeft: "user",
      iconNameRight: "arrow-right",
      onPress: () => selectedComponent("changeName")
    },
    {
      title: "Cambiar correo",
      iconType: "font-awesome",
      iconNameLeft: "at",
      iconNameRight: "arrow-right",
      onPress: () => selectedComponent("email")
    },
    {
      title: "Cambiar Contraseña",
      iconType: "font-awesome",
      iconNameLeft: "key",
      iconNameRight: "arrow-right",
      onPress: () => selectedComponent("password")
    }
  ];

  const selectedComponent = key => {
    switch (key) {
      case "changeName":
        setRenderComponent(
          <DisplayNameForm
            displayName={user.displayName}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
          />
        );
        setIsVisibleModal(true);
        break;
      case "email":
        setRenderComponent(
          <ChangeEmailForm
            email={user.email}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
          />
        );
        setIsVisibleModal(true);
        break;
      default:
        setRenderComponent(
          <ChangePasswordForm setIsVisibleModal={setIsVisibleModal} />
        );
        setIsVisibleModal(true);
        break;
    }
  };

  return (
    <View style={styles.container}>
      {list.map((item, index) => (
        <ListItem
          key={index}
          title={<Text style={styles.textTitle}>{item.title}</Text>}
          leftIcon={{
            type: item.iconType,
            name: item.iconNameLeft,
            color: "#536DFE",
            size: 18
          }}
          rightIcon={{
            type: item.iconType,
            name: item.iconNameRight,
            color: "#536DFE",
            size: 18
          }}
          onPress={item.onPress}
          containerStyle={styles.options}
        />
      ))}
      {renderComponent && (
        <Modal isVisible={isVibleModal} setIsVisible={setIsVisibleModal}>
          <View>{renderComponent}</View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  options: {
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
    height: 50
  },
  textTitle: {
    fontWeight: "bold"
  }
});

export default Options;
