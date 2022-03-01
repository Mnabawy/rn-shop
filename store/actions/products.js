import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    // any async code you want
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        "https://rn-shop-41c20-default-rtdb.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (let key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(prod => prod.ownerId === userId),
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = productId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const url = `https://rn-shop-41c20-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("somthing went wrong");
    }

    dispatch({
      type: DELETE_PRODUCT,
      productId: productId,
    });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const url = `https://rn-shop-41c20-default-rtdb.firebaseio.com/products.json?auth=${token}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
      },
    });
  };
};

export const updateProduct = (productId, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const url = `https://rn-shop-41c20-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`;
    
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
      }),
    });

    if (!response.ok) {
      throw new Error("somthing went wrong");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      productId,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
