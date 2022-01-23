import React from "react";
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableNativeFeedback,
} from "react-native";
import { useDispatch } from "react-redux";

import * as cartActions from "../../store/actions/cart";
import Colors from "../../constants/Colors";

const ProductItem = ({ item, navigation, onSelect, children }) => {
  let CustomTouchable = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    CustomTouchable = TouchableNativeFeedback;
  }

  const dispatch = useDispatch();

  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <CustomTouchable onPress={onSelect} useForeground>
          <View>
            <View>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
            </View>
            <View style={styles.btnContainer}>{children}</View>
          </View>
        </CustomTouchable>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: "#888",
  },
  btnContainer: {
    fontFamily: "open-sans-bold",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "17%",
    marginHorizontal: 20,
  },
});
