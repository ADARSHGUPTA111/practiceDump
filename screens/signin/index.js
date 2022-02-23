import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  Button,
  Image
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();
//returns the result back into the app after the successful login

const SignIn = ({ navigation, route }) => {
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    anrdoidClientId: process.env.REACT_APP_ANDROID_CLIENT_ID,
    iosClientId: process.env.REACT_APP_IOS_CLIENT_ID,
    expoClientId: process.env.REACT_APP_EXPO_CLIENT_ID
    // expoClientId:
    //   "23752230763-ft9rhgrkfuqb7c2fbc249e5ip0n4c41l.apps.googleusercontent.com"

    // env variables are not working still
  });

  // TODO : Find a way for environment variables to work

  useEffect(() => {
    console.log(process.env);
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
    // The issue with android standalone app is that, it always returns dismiss instead of success
    // works in emulators and ios devices
  }, [response]);

  async function getUserData() {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );

    userInfoResponse.json().then(data => {
      setUserInfo(data);
    });
  }

  function showUserInfo() {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      {showUserInfo()}
      <Button
        title={accessToken ? "Get User Data" : "Login"}
        onPress={
          accessToken
            ? getUserData
            : () => {
                promptAsync({ useProxy: true, showInRecents: true });
              }
        }
      />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center"
  },
  profilePic: {
    width: 50,
    height: 50
  }
});
