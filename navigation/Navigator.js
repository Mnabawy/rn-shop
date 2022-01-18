import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Colors from "../constants/Colors";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import ProductOverviewScreen from "../screens/shop/ProductsOverviewScreen";

const ProductsStackNavigator = createStackNavigator(
  {
    ProductsOverView: ProductOverviewScreen,
    ProductDetails: {
      screen: ProductDetailScreen,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam("productTitle"),
      }),
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    },
  }
);

export default createAppContainer(ProductsStackNavigator);
