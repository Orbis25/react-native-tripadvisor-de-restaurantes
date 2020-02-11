import React from "react";
import { Icon } from "react-native-elements";
import { StyleSheet } from "react-native";
export const IconTab = props => {
  const { route } = props.router;
  let iconName;
  let color = "#536DFE";
  switch (route.name) {
    case "Restaurantes":
      iconName = "silverware";
      break;
    case "Busqueda":
      iconName = "magnify";
      break;
    case "Top Restaurantes":
      iconName = "star";
      break;
    default:
      iconName = "account-circle";
      break;
  }

  return (
    <Icon
      name={iconName}
      type="material-community"
      color={color}
    />
  );
};

export const Styles = StyleSheet.create({
  root: {},
  labelTab: {
    marginBottom: 5
  },
  icon: {
    width: 0
  }
});
