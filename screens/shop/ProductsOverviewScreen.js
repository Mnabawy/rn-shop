import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";

const ProductOverviewScreen = props => {
  const PRODUCTS = useSelector(state => state.products.availableProducts);

  const item = ({ item }) => {
    const navigation = props.navigation;
    return <ProductItem item={item} navigation={navigation} />;
  };

  return (
    <FlatList
      data={PRODUCTS}
      renderItem={item}
      keyExtractor={item => item.id}
    />
  );
};

ProductOverviewScreen.navigationOptions = {
  headerTitle: "All Products",
};

export default ProductOverviewScreen;

const styles = StyleSheet.create({
  item: {},
  title: {},
});
