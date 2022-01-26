import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  FlatList,
  Platform,
  ActivityIndicator,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as cartActions from "../../store/actions/cart";
import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/ui/HeaderButton";
import Colors from "../../constants/Colors";

import * as productActions from "../../store/actions/products";

const ProductOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const PRODUCTS = useSelector(state => state.products.availableProducts);

  const dispatch = useDispatch();

  const loadedProducts = useCallback(async () => {
    setError(null)
    setIsLoading(true);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadedProducts();
  }, [dispatch, loadedProducts]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetails", {
      productId: id,
      productTitle: title,
    });
  };

  const navigation = props.navigation;

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error ocurred!</Text>
        <Button
          title="Try again"
          onPress={loadedProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && PRODUCTS.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
