import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Input, Button, Image } from "react-native-elements";
import Toast from "react-native-simple-toast";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import Modal from "../../shared/modal";
import MapView from "react-native-maps";
import { colors } from "../../../utils/shared.json";
import * as Location from "expo-location";
import uuid from "uuid-random";

import { firebaseApp } from "../../../utils/Firebase";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

const AddRestaurantForm = props => {
  const { navigate, setIsReloadRestaurant } = props;
  const [imagesSelected, setImagesSelected] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [restaurantLocation, setRestaurantLocation] = useState(null);
  const [errors, setErrors] = useState({});
  const [loadingbtn, setIsLoadingBtn] = useState(false);

  const save = () => {
    setErrors({});
    if (!name || !address || !description) {
      Toast.show("Todos los campos son requeridos");
    } else if (imagesSelected.length === 0) {
      Toast.show("El restaurante tiene que tener al menos una foto");
    } else if (!restaurantLocation) {
      Toast.show(
        "tienes que seleccionar el la ubicación del restaurante en el mapa , pulsando el icono"
      );
    } else {
      setIsLoadingBtn(true);
      uploadImagesStorage(imagesSelected)
        .then(response => {
          db.collection("restaurants")
            .add({
              name,
              address,
              description,
              location: restaurantLocation,
              images: response,
              rating: 0,
              ratingTotal: 0,
              quantityVoting: 0,
              createAt: new Date(),
              createBy: firebaseApp.auth().currentUser.uid
            })
            .then(() => {
              setIsLoadingBtn(false);
              setIsReloadRestaurant(true);
              navigate("Restaurants");
            })
            .catch(() => {
              setIsLoadingBtn(false);
              Toast.show("Error intente de nuevo");
            });
        })
        .finally(() => {
          setIsLoadingBtn(false);
        });
    }
  };

  const uploadImagesStorage = async imageArray => {
    const imagesBlob = [];
    await Promise.all(
      imageArray.map(async image => {
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = firebase
          .storage()
          .ref("restaurants-images")
          .child(uuid());
        await ref.put(blob).then(res => {
          imagesBlob.push(res.metadata.name);
        });
      })
    );
    return imagesBlob;
  };

  return (
    <ScrollView>
      <TopImage url={imagesSelected[0]} />
      <UplodadImage
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
      />
      <FormAdd
        setName={setName}
        setAddress={setAddress}
        setDescription={setDescription}
        setVisibleMap={setIsVisibleMap}
        locationRestaurant={restaurantLocation}
        errors={errors}
      />
      <Button
        title="Crear"
        buttonStyle={styles.btnAdd}
        containerStyle={styles.containerbtnAdd}
        onPress={save}
        loading={loadingbtn}
      />

      <Maps
        isVisible={isVisibleMap}
        setIsVisible={setIsVisibleMap}
        setLocationRestaurant={setRestaurantLocation}
      />
    </ScrollView>
  );
};

const TopImage = props => {
  const { url } = props;
  return (
    <View>
      {url ? (
        <Image source={{ uri: url }} style={styles.imageTop} />
      ) : (
        <Image
          source={require("../../../../assets/img/add.png")}
          style={styles.imageTop}
        />
      )}
    </View>
  );
};

const UplodadImage = props => {
  const { imagesSelected, setImagesSelected } = props;

  const imageSelect = async () => {
    const {
      permissions: {
        cameraRoll: { status }
      }
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "denied") {
      Toast.show(
        "Debes aceptar los permisos de camara para poder subir imagenes"
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (result.cancelled) {
        Toast.show("Cancelado");
      } else {
        setImagesSelected([...imagesSelected, result.uri]); //work equals to push
      }
    }
  };

  const removeImage = value => {
    const imagesArray = imagesSelected;

    Alert.alert(
      "Eliminar Imagen",
      "Seguro que desea eliminarla?",
      [
        { text: "cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "cancel",
          onPress: () => setImagesSelected(imagesArray.filter(x => x !== value))
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.viewImages}>
      {imagesSelected.length < 4 && (
        <Icon
          name="camera"
          type="font-awensome"
          color={colors.primary}
          size={30}
          containerStyle={styles.containerImageIcon}
          onPress={imageSelect}
        />
      )}
      {imagesSelected.map((value, index) => (
        <Avatar
          key={index}
          style={styles.miniature}
          onPress={() => removeImage(value)}
          source={{ uri: value }}
        />
      ))}
    </View>
  );
};

const FormAdd = props => {
  const {
    setName,
    setAddress,
    setDescription,
    setVisibleMap,
    errors,
    locationRestaurant
  } = props;
  return (
    <View style={styles.viewInputs}>
      <Input
        label="Nombre del restaurante"
        containerStyle={styles.inputContainer}
        onChange={e => setName(e.nativeEvent.text)}
        errorMessage={errors.name}
      />
      <Input
        label="Dirreción"
        errorMessage={errors.address}
        rightIcon={
          <Icon
            type="material-community"
            name="google-maps"
            color={locationRestaurant ? colors.success : "#c2c2c2"}
            onPress={() => setVisibleMap(true)}
          />
        }
        onChange={e => setAddress(e.nativeEvent.text)}
        containerStyle={styles.inputContainer}
      />
      <Input
        errorMessage={errors.description}
        label="Descripción del restaurante"
        multiline={true}
        inputStyle={styles.textArea}
        onChange={e => setDescription(e.nativeEvent.text)}
      />
    </View>
  );
};

const Maps = props => {
  const { isVisible, setIsVisible, setLocationRestaurant } = props;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === "denied") {
        Toast.show(
          "Necesitamos que aceptes los permisos de geolocalización para continuar",
          5000
        );
      } else {
        const {
          coords: { latitude, longitude }
        } = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        });
      }
    })();
  }, []);

  const confirmLocation = () => {
    setLocationRestaurant(location);
    Toast.show("ubicación guardada");
    setIsVisible(false);
  };

  return (
    <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
      <View>
        {location && (
          <MapView
            style={styles.map}
            initialRegion={location}
            showsUserLocation={true}
            onRegionChange={region => setLocation(region)}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
                longitudeDelta: location.longitudeDelta,
                latitudeDelta: location.latitudeDelta
              }}
              draggable
            />
          </MapView>
        )}
        <View style={styles.viewMapBtn}>
          <Button
            containerStyle={styles.viewMapBtnContainerSave}
            buttonStyle={styles.viewMapBtnSave}
            icon={<Icon type="font-awesome" name="check" color="#ffffff" />}
            onPress={confirmLocation}
          />
          <Button
            icon={<Icon type="font-awesome" name="times" color="#ffffff" />}
            containerStyle={styles.viewMapBtnContainerSave}
            buttonStyle={styles.viewMapBtnSave}
            onPress={() => setIsVisible(false)}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  viewImages: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5
  },
  containerImageIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3"
  },
  miniature: {
    width: 70,
    height: 70,
    marginRight: 10
  },
  imageTop: {
    width: Dimensions.get("window").width, // get full width for all devices
    height: 200
  },
  viewInputs: {
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10
  },
  inputContainer: {
    marginBottom: 15
  },
  textArea: {
    padding: 0,
    width: "100%",
    height: 60,
    margin: 0
  },
  map: {
    width: "100%",
    height: 500
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  },
  viewMapBtnContainerSave: {
    paddingRight: 5
  },
  viewMapBtnSave: {
    width: 85,
    backgroundColor: colors.primary
  },
  btnAdd: {
    width: 150,
    backgroundColor: colors.primary
  },
  containerbtnAdd: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  }
});
export default AddRestaurantForm;
