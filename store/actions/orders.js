import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const url = `https://rn-shop-41c20-default-rtdb.firebaseio.com/orders/${userId}.json`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw Error("Something went wrong!");
      }

      const resData = await response.json();
      console.log("orders action:", resData);
      const loadedOrders = [];

      for (let key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }
      dispatch({
        type: SET_ORDERS,
        orders: loadedOrders,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const date = new Date();
    // any async code you want
    const url = `https://rn-shop-41c20-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date.toString(),
      }),
    });

    if (!response.ok) {
      throw new Error("Somthing went wrong");
    }

    const resData = await response.json();

    await dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
