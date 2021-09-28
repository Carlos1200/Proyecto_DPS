import React from "react";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as AuthSession from "expo-auth-session";

interface Props {
  color: string;
}

const auth0ClientId = "8uAPe86FHrFBzCc0NfsZV2szQkf9LTfB";
const auth0Domain = "https://dev-k-r087zn.us.auth0.com";

export const BtnGoogle = ({ color }: Props) => {
  const toQueryString = (params) => {
    return (
      "?" +
      Object.entries(params)
        .map(
          ([key, value]: any) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&")
    );
  };

  const handleGoogle = async () => {
    // Retrieve the redirect URL, add this to the callback URL list
    // of your Auth0 application.
    const redirectUrl = AuthSession.makeRedirectUri();
    console.log(`Redirect URL: ${redirectUrl}`);

    // Structure the auth parameters and URL
    const queryParams = toQueryString({
      client_id: auth0ClientId,
      redirect_uri: redirectUrl,
      response_type: "id_token", // id_token will return a JWT token
      scope: "openid profile", // retrieve the user's profile
      nonce: "nonce", // ideally, this will be a random value
    });
    const authUrl = `${auth0Domain}/authorize` + queryParams;
    console.log(authUrl);

    // Perform the authentication
    const response = await AuthSession.startAsync({ authUrl });
    console.log("Authentication response", response);

    if (response.type === "success") {
      handleResponse(response.params);
    }
  };

  const handleResponse = (response) => {
    if (response.error) {
      return;
    }

    // Retrieve the JWT token and decode it
    const jwtToken = response.id_token;
    console.log(jwtToken);
  };

  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={handleGoogle}
      activeOpacity={0.8}>
      <Ionicons name='logo-google' color={color} style={styles.icon} />
      <Text style={styles.text}>Ingresar</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: "center",
  },
  icon: {
    fontSize: 25,
    marginRight: 10,
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
