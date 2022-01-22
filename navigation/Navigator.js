import React from "react";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";

import CartScreen from "../screens/shop/CartScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import ProductOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import Colors from "../constants/Colors";

const defaultNavOptions = {
  headerTitleStyle: {
    fontFamily: "open-sans",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsStackNavigator = createStackNavigator(
  {
    ProductsOverView: ProductOverviewScreen,
    ProductDetails: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },

    defaultNavigationOptions: defaultNavOptions,
  }
);

const OrderStackNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsStackNavigator,
    Orders: OrderStackNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
  }
);

export default createAppContainer(ShopNavigator);
