import React, { useReducer } from "react";
import {
  StyleSheet,
  ScrollView,
  Button,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/auth";
import { useCallback } from "react";

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

const AuthScreen = () => {
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
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

  const signupHandler = () => {
    dispatch(
      authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      )
    );
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address"
              value={formState.inputValues.email}
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password"
              value={formState.inputValues.password}
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.btnContainer}>
              <Button
                title="Login"
                color={Colors.primary}
                onPress={signupHandler}
              />
            </View>
            <View style={styles.btnContainer}>
              <Button
                title="Switch To Sign Up"
                color={Colors.accint}
                onPress={() => {}}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  btnContainer: {
    marginTop: 10,
  },
});