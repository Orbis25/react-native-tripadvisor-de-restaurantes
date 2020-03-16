import React from "react";
import Carousel from "react-native-banner-carousel";
import { StyleSheet, Image, View, Dimensions } from "react-native";
const BannerWidth = Dimensions.get("window").width;
const BannerHeight = 240;

const ImagesRestaurantCarousel = props => {
  const { images } = props;
  return (
    <View style={styles.container}>
      <Carousel
        autoplay
        autoplayTimeout={5000}
        loop
        index={0}
        pageSize={BannerWidth}
      >
        {images.map((image, index) => (
          <View key={index}>
            <Image
              style={{ width: BannerWidth, height: BannerHeight }}
              source={{ uri: image }}
            />
          </View>
        ))}
      </Carousel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "center"
  }
});

export default ImagesRestaurantCarousel;
