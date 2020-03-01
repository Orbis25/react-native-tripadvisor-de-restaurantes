import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import restaurantsScreen from "../../screens/restaurants/home/index";
import myAccountScreen from "../../screens/myAccount";
import searchScreen from "../../screens/search";
import topRestaurantsScreen from "../../screens/restaurants/topRestaurants";
import LoginScreen from "../../screens/login";
import RegisterScreen from "../../screens/register";
import AddRestaurant from "../../screens/restaurants/addRestaurants";

const cardBackGround = "#ffffff";
const Stack = createStackNavigator();

export const RestaurantScreenStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Restaurants"
      options={{
        title: "Restaurantes",
        cardStyle: { backgroundColor: cardBackGround }
      }}
      component={restaurantsScreen}
    />
    <Stack.Screen
      name="AddRestaurants"
      options={{
        title: "Nuevo Restaurante",
        cardStyle: { backgroundColor: cardBackGround }
      }}
      component={AddRestaurant}
    />
  </Stack.Navigator>
);

export const myAccountScreenStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="myAccountScreen"
      options={{
        title: "MI Cuenta",
        cardStyle: { backgroundColor: cardBackGround }
      }}
      component={myAccountScreen}
    />
    <Stack.Screen
      name="login"
      options={{
        title: "Login",
        cardStyle: { backgroundColor: cardBackGround }
      }}
      component={LoginScreen}
    />
    <Stack.Screen
      name="register"
      options={{
        title: "Crear cuenta",
        cardStyle: { backgroundColor: cardBackGround }
      }}
      component={RegisterScreen}
    />
  </Stack.Navigator>
);

export const searchScreenStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="searchScreen"
      options={{
        title: "Busca tu restaurante",
        cardStyle: { backgroundColor: cardBackGround }
      }}
      component={searchScreen}
    />
  </Stack.Navigator>
);

export const topRestaurantsScreenStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="topRestaurantsScreen"
      options={{
        title: "Los mejores Restaurantes",
        cardStyle: { backgroundColor: cardBackGround }
      }}
      component={topRestaurantsScreen}
    />
  </Stack.Navigator>
);
