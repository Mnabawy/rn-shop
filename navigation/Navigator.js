import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Colors from "../constants/Colors";
import CartScreen from "../screens/shop/CartScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import ProductOverviewScreen from "../screens/shop/ProductsOverviewScreen";

const ProductsStackNavigator = createStackNavigator(
  {
    ProductsOverView: ProductOverviewScreen,
    ProductDetails: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: {
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
    },
  }
);

export default createAppContainer(ProductsStackNavigator);
