import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam("productId");
  const products = useSelector(state => state.products.availableProducts);
  const product = products.find(item => item.id === productId);

  return (
    <ScrollView>
      <View style={styles.imageContianer}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
      </View>
      <View>
        <Text></Text>
        <Text></Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContianer: {
    width: "100%",
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ProductDetailScreen;
