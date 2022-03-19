import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Platform,
  FlatList,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import OrderItem from "../../components/shop/OrderItem";
import HeaderButton from "../../components/ui/HeaderButton";
import Colors from "../../constants/Colors";
import * as ordersActions from "../../store/actions/orders";

const OrdersScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(ordersActions.fetchOrders()).then(() => setRefreshing(false));
  });

  useEffect(() => {
    setIsLoading(true);

    dispatch(ordersActions.fetchOrders()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centerd}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.centerd}>
        <Text>No Order Found</Text>
      </View>
    );
  }

  return (
    <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      data={orders}
      keyExtracto={itemData => itemData.id}
      renderItem={itemData => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

export const screenOptions = navData => {
  return {
    headerTitlel: "Your Orders",
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
  };
};

const styles = StyleSheet.create({
  centerd: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default OrdersScreen;
