import React from "react";
import { View, Text } from "react-native";
import AddRestaurantForm from "../../../components/restaurants/addRestaurantForm";
const AddRestaurants = props => {
  const {
    navigation: { navigate },
    route: {
      params: { setIsReloadRestaurant }
    }
  } = props;
  return (
    <View>
      <AddRestaurantForm
        navigate={navigate}
        setIsReloadRestaurant={setIsReloadRestaurant}
      />
    </View>
  );
};

export default AddRestaurants;
