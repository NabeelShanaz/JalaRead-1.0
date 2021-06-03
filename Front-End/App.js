import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Dashboard from "./screens/Dashboard";
import Ph from "./screens/Ph";
import TestingPage from "./screens/TestingPage";
import TestingLoadingPage from "./screens/TestingLoadingPage";
import TestingSensorPage from "./screens/TestingSensorPage";
import StartPage from "./screens/StartPage";
import WaterTestingScreen from "./screens/WaterTestingScreen";
import TestedAreas from "./screens/TestedAreas";
import MonthlyResults from "./screens/MonthlyResults";
import LocationInput from "./screens/LocationInput";
import AdminSignin from "./screens/AdminSignin";
import WelcomePage from "./screens/WelcomePage";
import SignUpPage from "./screens/SignUpPage";
import SignUp2ndPage from "./screens/SignUp2ndPage";
import UserPage from "./screens/UserPage";
import UserEditPage from "./screens/UserEditPage";
import NameEdit from "./screens/NameEdit";
import MailEdit from "./screens/MailEdit";
import PhoneEdit from "./screens/PhoneEdit";
import WaterTestingSecond from "./screens/WaterTestingSecond";
import LoginPage from "./screens/LoginPage";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import store from "./store/store";
import { createStackNavigator } from "@react-navigation/stack";

const customFonts = {
  SFProRounded: require("./assets/fonts/SF-Pro-Rounded.ttf"),
};

export default function App() {
  const [isLoaded] = useFonts(customFonts);
  const Stack = createStackNavigator();
  if (!isLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={"WelcomePage"}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen
              name="WaterTestingScreen"
              component={WaterTestingScreen}
            />
            <Stack.Screen name="SignUpPage" component={SignUpPage} />
            <Stack.Screen
              name="WaterTestingSecond"
              component={WaterTestingSecond}
            />
            <Stack.Screen name="AdminSignin" component={AdminSignin} />
            <Stack.Screen name="LocationInput" component={LocationInput} />
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="MailEdit" component={MailEdit} />
            <Stack.Screen name="MonthlyResults" component={MonthlyResults} />
            <Stack.Screen name="NameEdit" component={NameEdit} />
            <Stack.Screen name="PhoneEdit" component={PhoneEdit} />
            <Stack.Screen name="StartPage" component={StartPage} />
            <Stack.Screen name="TestedAreas" component={TestedAreas} />
            <Stack.Screen name="TestingPage" component={TestingPage} />
            <Stack.Screen
              name="TestingLoadingPage"
              component={TestingLoadingPage}
            />
            <Stack.Screen
              name="TestingSensorPage"
              component={TestingSensorPage}
            />
            <Stack.Screen name="UserEditPage" component={UserEditPage} />
            <Stack.Screen name="UserPage" component={UserPage} />
            <Stack.Screen name="WelcomePage" component={WelcomePage} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
registerRootComponent(App);
