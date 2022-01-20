import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as cartActions from "../../store/actions/cart";
import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/ui/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const ProductOverviewScreen = props => {
  const PRODUCTS = useSelector(state => state.products.availableProducts);

  const dispatch = useDispatch();

  const item = ({ item }) => {
    const navigation = props.navigation;
    return (
      <ProductItem
        item={item}
        navigation={navigation}
        onAddToCart={() => {
          dispatch(cartActions.addToCard(item));
        }}
      />
    );
  };

  return (
    <FlatList
      data={PRODUCTS}
      renderItem={item}
      keyExtractor={item => item.id}
    />
  );
};

ProductOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: "All Products",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        ></Item>
      </HeaderButtons>
    ),
  };
};

export default ProductOverviewScreen;

const styles = StyleSheet.create({
  item: {},
  title: {},
});
