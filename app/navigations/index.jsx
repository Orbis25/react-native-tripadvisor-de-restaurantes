import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { IconTab, Styles } from "./NavigatorOptions";
const { Navigator, Screen } = createBottomTabNavigator();

import {
  RestaurantScreenStack,
  myAccountScreenStack,
  searchScreenStack,
  topRestaurantsScreenStack,
  favoriteScreenStack
} from "./stacks/index";

const Navigation = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={(router) => ({
          tabBarIcon: (props) => <IconTab router={router} {...props} />,
        })}
        tabBarOptions={{
          style: Styles.root,
          labelStyle: Styles.labelTab,
        }}
        initialRouteName="Restaurantes"
      >
        <Screen name="Restaurantes" component={RestaurantScreenStack} />
        <Screen name="Top Restaurantes" component={topRestaurantsScreenStack} />
        <Screen name="Favoritos" component={favoriteScreenStack} />
        <Screen name="Busqueda" component={searchScreenStack} />
        <Screen name="Cuenta" component={myAccountScreenStack} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
