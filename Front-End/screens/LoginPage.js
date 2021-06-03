import React, { useEffect, useState } from "react";
import {
  FlatList,
  Button,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import TestingSensorPage from "./TestingSensorPage";
import Spinner from "react-native-loading-spinner-overlay";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { useSelector, useDispatch } from "react-redux";
import { ADD_USER } from "../store/constants";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import { Dimensions, TouchableHighlight, Image } from "react-native";

export default function LoginPage({ navigation }) {
  const [text, onChangeText] = React.useState("location ");
  const reduxState = useSelector((state) => state.initialReducer.user);
  const dispatch = useDispatch();
  const [data, setData] = React.useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidPassword: true,
    isValidUser: true,
  });

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handelPasswordChange = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecuretextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const pressHandler = () => {
    navigation.navigate("Home");
  };

  const pressHandler2 = () => {
    navigation.navigate("Signup");
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };
  const loginHandle = (email, password) => {
    if (data.email.length >= 4 && data.password.length >= 6) {
      username: data.email;
      password: data.password;
      const req = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: data.email,
          password: data.password,
        }),
      };

      console.log(data.email);

      var errorAlert = "";

      fetch("http://127.0.0.1:5000/login", req)
        .then((response) => response.json())
        .then((response) => {
          if (response["message"] == "Unauthorized") {
            errorAlert = "Username or password doesn't match";
          }
          if (response["message"] == "Authorized") {
            navigation.navigate("Dashboard");
            console.log("This Is User Name from API :", user_name);
            var user_name = response["user_details"]["user_name"];
            dispatch({
              type: ADD_USER,
              payload: user_name || "",
            });
          }
        });
    } else if (data.email.length == 0 || data.password.length == 0) {
      alert("Please fill the following requirments");
    }
  };

  return (
    <View style={{ flex: 1, padding: 0, backgroundColor: "white" }}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.headContainer}>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("WelcomePage")}
            >
              <Image
                source={require("../assets/back-arrow-blue.png")}
                style={styles.BackArrow}
              />
            </TouchableOpacity>

            <Text style={styles.HeadText}>JalaRead</Text>
          </View>
        </View>

        <View style={styles.Instruction}>
          <Image
            source={require("../assets/login-page-img.svg")}
            style={styles.LoginPageImg}
          />
          <Text style={styles.LoginHeadTxt}>
            <Text style={styles.LoginHeadTxtCap}>Login</Text>
            {"\n"}
            Welcome Back!
          </Text>

          <View
            style={{
              marginTop: 290,
              position: "absolute",
              width: "100%",
              height: "50%",
            }}
          >
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
              <Text style={styles.text_footer}>Username</Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color="#05375a" size={20} />

                <TextInput
                  placeholder="Enter Your Username"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val) => textInputChange(val)}
                  onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? (
                  <Animatable.View animation="bounceIn">
                    <Feather
                      name="check-circle"
                      color="#37E290"
                      size={20}
                      style={{ position: "absolute", right: -150 }}
                    />
                  </Animatable.View>
                ) : null}
              </View>
              {data.isValidUser ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    Username must be more than 4 characters.
                  </Text>
                </Animatable.View>
              )}

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 35,
                  },
                ]}
              >
                Password
              </Text>

              <View style={styles.action}>
                <Feather name="lock" color="#05375a" size={20} />

                <TextInput
                  placeholder="Enter Your Password"
                  secureTextEntry={data.secureTextEntry ? true : false}
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val) => handelPasswordChange(val)}
                />
                <TouchableOpacity onPress={updateSecuretextEntry}>
                  {data.secureTextEntry ? (
                    <Feather
                      name="eye-off"
                      color="grey"
                      size={20}
                      style={{ position: "absolute", right: -150 }}
                    />
                  ) : (
                    <Feather
                      name="eye"
                      color="grey"
                      size={20}
                      style={{ position: "absolute", right: -150 }}
                    />
                  )}
                </TouchableOpacity>
              </View>
              {data.isValidPassword ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>
                    Password must be more than 6 characters.
                  </Text>
                </Animatable.View>
              )}
            </Animatable.View>
          </View>
        </View>
        <View style={styles.BottomButtomContainer}>
          <TouchableOpacity
            style={styles.BottomButtom}
            onPress={() => {
              loginHandle(data.email, data.password);
            }}
          >
            <Text style={styles.BottomButtomText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.BottomButtomCapText}>
            Don't have an account?{" "}
            <TouchableOpacity
              style={{ color: "#FF7B8A" }}
              onPress={() => navigation.navigate("SignUpPage")}
            >
              Sign in
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
}

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

const MyActivityIndicator = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginLeft: 10,
    fontFamily: "SFProRounded",
  },

  text_footer: {
    color: "#626263",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "SFProRounded",
  },
  errorMsg: {
    color: "#C70039",
    fontSize: 14,
    fontFamily: "SFProRounded",
  },
  footer: {
    paddingBottom: "20%",
    position: "absolute",
    width: "80%",
    marginLeft: "10%",
    marginTop: "5%",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },

  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },

  BottomButtomContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    bottom: "0%",
    height: "20%",

    marginTop: 0,
  },

  BottomButtom: {
    width: "40%",
    borderRadius: 11,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#030082",
  },

  BottomButtomText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    fontFamily: "SFProRounded",
  },

  BottomButtomCapText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#515151",
    marginTop: 10,
    fontFamily: "SFProRounded",
  },

  HeadText: {
    position: "absolute",

    fontFamily: "SFProRounded",
    fontSize: 23,
    fontWeight: "bold",
    color: "#030093",
    top: "50%",
    right: 30,
  },
  LoginHeadTxt: {
    position: "absolute",

    fontFamily: "SFProRounded",
    fontSize: 23,
    fontWeight: "800",
    color: "#030093",
    top: "50%",
    left: 40,
    marginEnd: 200,
  },
  LoginHeadTxtCap: {
    fontFamily: "SFProRounded",
    fontSize: 16,
    fontWeight: "600",
    color: "#626263",
  },

  HeadTextCap: {
    position: "absolute",
    fontFamily: "SFProRounded",
    fontSize: 14,

    color: "#D1E1FF",
    top: 103,
    left: 30,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#EFFBFF",
  },
  headContainer: {
    flex: 1,
    position: "absolute",
    width: Dimensions.get("window").width,
    height: "26%",
  },
  headContent: {
    flex: 1,
  },

  InnerHeadContent: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    top: "12%",
    height: "10%",
    marginTop: "5%",
    marginBottom: "5%",
    backgroundColor: "white",
    borderStyle: "solid",
    borderWidth: 0,

    borderRadius: 25,
    paddingTop: 50,
  },

  InnerHeadText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#00397C",

    fontFamily: "SFProRounded",
    bottom: 180,
    textAlign: "center",
    lineHeight: 30,
    marginBottom: 15,
  },

  Instruction: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    top: "20%",
    height: "50%",
    width: Dimensions.get("window").width,
    marginRight: 0,
    marginTop: "5%",
  },

  InstructionNum: {
    flexDirection: "row",
    width: "80%",

    padding: 27,
    paddingBottom: 15,
    paddingTop: 10,

    borderColor: "rgba(0, 0, 0, 0.5)",
    backgroundColor: "white",
  },

  InstructionText: {
    color: "#626263",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "SFProRounded",
    paddingBottom: 5,
  },

  StartLogo: {
    width: 25,
    height: 25,
    marginRight: "10%",
    marginTop: 10,
  },
  LoginPageImg: {
    width: 257,
    height: 231,

    bottom: "40%",
  },

  WelcomeLogo: {
    width: 70,
    height: 70,

    bottom: "100%",
  },

  input: {
    height: 40,
    margin: 12,
    width: 320,
    borderBottomWidth: 1,
    borderColor: "#030093",
    fontFamily: "SFProRounded",
  },

  BackArrow: {
    width: 10,
    height: 17,
    marginLeft: 30,
    marginTop: 30,
  },
});
