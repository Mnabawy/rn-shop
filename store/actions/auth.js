import { AsyncStorage } from "react-native";

// export const SIGNUP = "SIGNUP";
// export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";

export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId, token };
};

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_Tum8MtvAEPkr0FJbpE_LnzNdGXwmk30",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;

      let message = "Something went Wrong";
      if (errorId === "EMAIL_EXISTS") {
        message = "This Email Exists already ";
      }
      throw Error(message);
    }

    const resData = await response.json();

    dispatch(authenticate(resData.localId, resData.idToken));
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_Tum8MtvAEPkr0FJbpE_LnzNdGXwmk30",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      // console.log(errorResData.error.message);

      let message;
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This Email Could not be Found";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This Password is not Valid";
      }
      throw Error(message);
    }

    const resData = await response.json();
    dispatch(authenticate(resData.localId, resData.idToken));
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

const saveDataToStorage = (token, userId, expiratinDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expiryDate: expiratinDate.toISOString(),
    })
  );
};
