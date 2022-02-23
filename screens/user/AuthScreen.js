import React from "react";
import {
  StyleSheet,
  ScrollView,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import Card from "../../components/ui/Card";

import Input from "../../components/ui/Input";
import Colors from "../../constants/Colors";

const AuthScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id="email"
            label="E-Mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorMessag="Please enter a valid email address"
            onValueChange={() => {}}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            required
            minLength={5}
            autoCapitalize="none"
            errorMessag="Please enter a valid password"
            onValueChange={() => {}}
            initialValue=""
          />

          <Button title="Login" color={Colors.primary} onPress={() => {}} />
          <Button
            title="Switch To Sign Up"
            color={Colors.accint}
            onPress={() => {}}
          />
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
