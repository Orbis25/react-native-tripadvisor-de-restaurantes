import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator
} from "react-native";
import { Card, Image, Icon, Rating } from "react-native-elements";
import { colors } from "../../../utils/shared.json";
import LottieAnimation from "../../shared/animation";
import * as firebase from "firebase";
const RestaurantList = props => {
  const { restaurants, handlerLoadMore, isLoading } = props;
  return restaurants.length > 0 ? (
    <FlatList
      data={restaurants}
      renderItem={restaurant => <Cardlist restaurant={restaurant} />}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={handlerLoadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={<FooterLoader isLoading={isLoading} />}
    />
  ) : (
    <View>
      <LottieAnimation
        file={require("../../../../assets/animations/loading.json")}
      />
      <Text style={styles.loadingText}>Cargando Restaurantes...</Text>
    </View>
  );
};

const Cardlist = props => {
  const {
    restaurant: {
      item: {
        restaurant: { name, address, description, quantityVoting, images }
      }
    }
  } = props;
  const [imageServer, setImageServer] = useState(null);

  useEffect(() => {
    const image = images[0];
    firebase
      .storage()
      .ref(`restaurants-images/${image}`)
      .getDownloadURL()
      .then(result => {
        setImageServer(result);
      });
  }, [images]);

  const sliceText = text => {
    return text.length > 30 ? `${text.slice(0, 30)}...` : text;
  };

  return (
    <View style={styles.cardListRoot}>
      <View>
        <Image
          source={{ uri: imageServer }}
          style={styles.topImageCard}
          PlaceholderContent={<ActivityIndicator size="small" color="#fff" />}
        />
      </View>
      <View>
        <Text style={styles.cardListText}>{name}</Text>

        <View style={styles.viewContainerAddress}>
          <Text style={styles.cardListTextAddress}>{address}</Text>
        </View>
        <Text style={styles.cardTextDescription}>{sliceText(description)}</Text>
        <View style={styles.containerRating}>
          <Rating imageSize={15} />
        </View>
      </View>
    </View>
  );
};

const FooterLoader = props => {
  const { isLoading } = props;
  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  } else {
    return (
      <View>
        <Text style={styles.loadingText}>No quedan mas restaurantes</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  cardListRoot: {
    margin: 10,
    flexDirection: "row",
    borderRadius: 10
  },
  cardListText: {
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 15
  },
  cardListTextAddress: {
    fontWeight: "bold",
    marginLeft: 10,
    flexDirection: "column"
  },
  cardTextDescription: {
    marginTop: 3,
    marginLeft: 10,
    color: "grey",
    fontWeight: "bold"
  },
  viewContainerAddress: {
    flexDirection: "row"
  },
  containerRating: {
    flexDirection: "row",
    marginTop: 4,
    marginLeft: 10
  },
  topImageCard: {
    width: 80,
    height: 80,
    padding: 0,
    margin: 0,
    borderRadius: 50
  },
  loadingText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10
  }
});

export default RestaurantList;
