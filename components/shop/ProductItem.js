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

import Colors from "../../constants/Colors";

const ProductItem = ({ item, navigation }) => {
  let CustomTouchable = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    CustomTouchable = TouchableNativeFeedback;
  }

  return (
    <View style={styles.product}>
      <CustomTouchable
        onPress={() =>
          navigation.navigate("ProductDetails", {
            productId: item.id,
            productTitle: item.title,
          })
        }
        useForeground
      >
        <View>
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>
      </CustomTouchable>
      <View style={styles.btnContainer}>
        <Button
          color={Platform.OS === "android" ? Colors.primary : ""}
          title="View Details"
          onPress={() =>
            navigation.navigate("ProductDetails", {
              productId: item.id,
              productTitle: item.title,
            })
          }
        />
        <Button
          color={Platform.OS === "android" ? Colors.primary : ""}
          title="To Cart"
        />
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
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    marginHorizontal: 20,
  },
});
