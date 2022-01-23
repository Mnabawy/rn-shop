import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/products";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      const { title, imageUrl, description, price } = action.productData;
      const newProduct = new Product(
        new Date().toString(),
        "u1",
        title,
        imageUrl,
        description,
        price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.availableProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        prod => prod.id === action.productId
      );

      const updatedPoduct = new Product(
        action.productId,
        state.userProducts[productIndex].ownerId,
        title,
        imageUrl,
        description,
        state.userProducts[productIndex].price
      );

      const updatedUserProducts = [...state.availableProducts];
      updatedUserProducts[productIndex] = updatedPoduct;

      const availabelProductsIndex = state.availableProducts.findIndex(
        prod => prod.id === action.productId
      );
      const updatedAvailablProducts = [...state.availableProducts];
      updatedAvailablProducts[availabelProductsIndex] = updatedPoduct;

      return {
        ...state,
        availableProducts: updatedAvailablProducts,
        userProducts: updatedUserProducts,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          product => product.id !== action.productId
        ),
        availableProducts: state.availableProducts.filter(
          product => product.id !== action.productId
        ),
      };
  }
  return state;
};
