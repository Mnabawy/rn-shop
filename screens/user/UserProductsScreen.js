import React from "react";
import { FlatList, StyleSheet, Text, View, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/ui/HeaderButton";
import * as productActions from "../../store/actions/products";
import Colors from "../../constants/Colors";

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = productId => {
    props.navigation.navigate("EditProduct", {
      productId: productId,
    });
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <ProductItem item={item} key={item.id} onSelect={() => {}}>
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => editProductHandler(item.id)}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              dispatch(productActions.deleteProduct(item.id));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: "Your Products",
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
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navData.navigation.navigate("EditProduct");
          }}
        ></Item>
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default UserProductsScreen;
