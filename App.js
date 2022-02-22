import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import RootNavigator from "./navigation";

export default function App() {
  return (
    // <SafeAreaView style={styles.container}>
    // {/* <View> */}
    <>
      <StatusBar style="auto" />
      <RootNavigator />
    </>
    // </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center"
  }
});
