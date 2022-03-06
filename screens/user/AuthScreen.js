import React, { useState, useCallback, useReducer, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/auth";
import Button from "../../components/ui/Button";

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

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedUp, SetIsSignedUp] = useState(false);
  const [error, setError] = useState();
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

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignedUp) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);

    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate("Shop");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id="email"
            label="E-Mail"
            keyboardType="email-address"
            required
            textContentType="emailAddress"
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
            textContentType="password"
            secureTextEntry={true}
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
              title={isSignedUp ? "Sign Up" : "Login"}
              style={styles.primaryBg}
              onPress={authHandler}
            />
          </View>
          <View style={styles.btnContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <Button
                style={styles.accintBg}
                title={`swtich To ${isSignedUp ? "Login" : "Sign Up"}`}
                onPress={() => {
                  SetIsSignedUp(prevState => !prevState);
                }}
              />
            )}
          </View>
        </ScrollView>
      </Card>
    </LinearGradient>
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
  primaryBg: {
    backgroundColor: Colors.primary,
  },
  accintBg: {
    backgroundColor: Colors.accint,
  },
});
