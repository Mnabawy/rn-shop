export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (cartItems, totalAmount) => {
  return async dispatch => {
    const date = new Date();
    // any async code you want
    const response = await fetch(
      "https://rn-shop-41c20-default-rtdb.firebaseio.com/orders/u1.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toString(),
        }),
      }
    );

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
