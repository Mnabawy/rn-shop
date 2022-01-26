import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  FlatList,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as cartActions from "../../store/actions/cart";
import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/ui/HeaderButton";
import Colors from "../../constants/Colors";

import * as productActions from "../../store/actions/products";

const ProductOverviewScreen = props => {
  const PRODUCTS = useSelector(state => state.products.availableProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productActions.fetchProducts());
  }, [dispatch]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetails", {
      productId: id,
      productTitle: title,
    });
  };

  const navigation = props.navigation;

  return (
    <FlatList
      data={PRODUCTS}
      renderItem={({ item }) => {
        return (
          <ProductItem
            item={item}
            navigation={navigation}
            onSelect={() => {
              selectItemHandler(item.id, item.title);
            }}
          >
            <Button
              color={Platform.OS === "android" ? Colors.primary : ""}
              title="View Details"
              onPress={() => {
                selectItemHandler(item.id, item.title);
              }}
            />
            <Button
              color={Platform.OS === "android" ? Colors.primary : ""}
              title="To Cart"
              onPress={() => dispatch(cartActions.addToCard(item))}
            />
          </ProductItem>
        );
      }}
      keyExtractor={item => item.id}
    />
  );
};

ProductOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: "All Products",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        ></Item>
      </HeaderButtons>
    ),
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
