import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import restaurantsScreen from "../../screens/restaurants/index";
import myAccountScreen from "../../screens/myAccount";
import searchScreen from "../../screens/search";
import topRestaurantsScreen from "../../screens/topRestaurants";

const Stack = createStackNavigator();

export const RestaurantScreenStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Restaurants"
      options={{ title: "Restaurantes" }}
      component={restaurantsScreen}
    />
  </Stack.Navigator>
);

export const myAccountScreenStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="myAccountScreen"
      options={{ title: "MI Cuenta" }}
      component={myAccountScreen}
    />
  </Stack.Navigator>
);

export const searchScreenStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="searchScreen"
      options={{ title: "Busca tu restaurante" }}
      component={searchScreen}
    />
  </Stack.Navigator>
);

export const topRestaurantsScreenStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="topRestaurantsScreen"
      options={{ title: "Los mejores Restaurantes" }}
      component={topRestaurantsScreen}
    />
  </Stack.Navigator>
);
