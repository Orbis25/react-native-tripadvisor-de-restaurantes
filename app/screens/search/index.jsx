import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import * as firebase from "firebase";
import firebaseApp from "firebase/app";
import { FireSQL } from "firesql";

const firesql = new FireSQL(firebaseApp.firestore(), { includeId: "id" });

const Search = (props) => {
  const { navigation } = props;
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search) {
      firesql
        .query(`SELECT * FROM restaurants WHERE name LIKE '${search}'`)
        .then((response) => {
          setRestaurants(response);
        });
    }
  }, [search]);

  return (
    <View>
      <SearchBar
        placeholder="buscar restaurante"
        onChangeText={(e) => setSearch(e)}
        value={search}
        containerStyle={styles.containerSearchBar}
        style={styles.searchBar}
      />
      {restaurants.length === 0 ? (
        <View>
          <Text style={styles.notFound}>No hay resultados</Text>
        </View>
      ) : (
        <FlatList
          data={restaurants}
          renderItem={(restaurant) => (
            <Restaurant restaurant={restaurant} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const Restaurant = (props) => {
  const { restaurant, navigation } = props;
  const { name, images } = restaurant.item;
  const [imageRestaurant, setImageRestaurant] = useState(null);
  useEffect(() => {
    const image = images[0];
    firebase
      .storage()
      .ref(`restaurants-images/${image}`)
      .getDownloadURL()
      .then((resul) => {
        setImageRestaurant(resul);
      });
  }, []);
  return (
    <ListItem
      onPress={() =>
        navigation.navigate("Restaurant", { restaurant: restaurant.item })
      }
      title={name}
      leftAvatar={{ source: { uri: imageRestaurant } }}
      rightIcon={<Icon type="material-community" name="chevron-right" />}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {},
  containerSearchBar: {
    borderWidth: 1,
  },
  notFound: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    fontSize: 20,
  },
});

export default Search;
