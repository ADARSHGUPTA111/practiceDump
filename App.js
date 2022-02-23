import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import Navigation from "./navigation";
import Amplify from "aws-amplify";
import config from "./src/aws-exports";
import { AmplifyTheme } from "aws-amplify-react-native";

// import {withAuthenticator, AmplifyTheme} from "aws-amplify-react-native";
// AmplifyTheme lets you to change the default styles of authentication pages

Amplify.configure(config);

const App = () => {
  // Auth.signOut();
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9FBFC"
  }
});

export default App;

// if we would use the withAuthenticator HOC of amplify
// we would get the default ui screens for authentication
// it is fully function, but we need to customise as per our needs using json
// there we can place whatever fields we want very easily.
// But most of the times, we remove the withAuthenticator HOC and do as we did in the project above

// Example :

// signupConfig = {
//   [
//     {label : "Username",
//      key : "username",
//      required : true,
//      displayOrder : 3,
//      type : 'string'
//   }

//   ]
// }

// const customTheme = {...AmplifyTheme, button:{
// ...AmplifyTheme.button,
// backgrountColor : 'red'
// }
// }

// Similarly, we can make many changes as per our needs

// https://docs.amplify.aws/ui/customization/theming/q/framework/react-native/ --> default theming in amplify
// export default withAuthenticator(App,{signupConfig, theme : customTheme})
