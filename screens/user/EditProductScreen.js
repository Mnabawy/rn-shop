import React, { useEffect, useCallback, useReducer, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import * as productActions from "../../store/actions/products";
import HeaderButton from "../../components/ui/HeaderButton";
import FormInput from "../../components/ui/Input";
import Colors from "../../constants/Colors";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE ";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditProductScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const productId = props.route.params ? props.route.params.productId : null;
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(product => product.id === productId)
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error occured!", error, [{ text: "ok" }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("wrong input", "Please check the errors in the form", [
        { text: "ok", style: "default" },
      ]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      if (editedProduct) {
        await dispatch(
          productActions.updateProduct(
            productId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        );
      } else {
        await dispatch(
          productActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, productId, formState]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={submitHandler}
          ></Item>
        </HeaderButtons>
      ),
    });
  }, [submitHandler]);

  const inpuChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={styles.form}>
          <FormInput
            id="title"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            errorText="Please enter a valid title!"
            label="Title"
            value={formState.inputValues.title}
            onInputChange={inpuChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ""}
            initiallyValid={!!editedProduct}
            required
          />
          <FormInput
            id="imageUrl"
            keyboardType="default"
            returnKeyType="next"
            errorText="Please enter a valid image url!"
            label="ImageUrl"
            value={formState.inputValues.imageUrl}
            onInputChange={inpuChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initiallyValid={!!editedProduct}
            required
          />

          {!editedProduct && (
            <FormInput
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inpuChangeHandler}
              required
              min={0.1}
            />
          )}
          <FormInput
            id="description"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            errorText="Please enter a valid ImageUrl!"
            label="Description"
            numberOfLines={3}
            value={formState.inputValues.description}
            onInputChange={inpuChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ""}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = navData => {
  const routeParams = navData.route.params ? navData.route.params : {};

  return {
    headerTitle: routeParams.productId ? "Edit Product" : "Add Product",
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProductScreen;
