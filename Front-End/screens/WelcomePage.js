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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import TestingSensorPage from "./TestingSensorPage";
import Spinner from "react-native-loading-spinner-overlay";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import { Dimensions, TouchableHighlight, Image } from "react-native";

export default function WelcomePage({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 0, backgroundColor: "white" }}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.InnerHeadContent}>
          <Image
            source={require("../assets/jala-read-logo-blue.svg")}
            style={styles.WelcomeLogo}
          />
          <Text style={styles.InnerHeadText}>
            Welcome to{"\n"}
            <Text style={{ color: "#0099C9" }}>JalaRead</Text>, mobile
          </Text>
          <Text style={styles.InstructionText}>
            Your water testing deviceses, mobile {"\n"}application on your
            fingertips
          </Text>
        </View>

        <View style={styles.Instruction}>
          <Image
            source={require("../assets/welcome-page-img.svg")}
            style={styles.WelcomePageImg}
          />
        </View>
        <View style={styles.BottomButtomContainer}>
          <TouchableOpacity
            style={styles.BottomButtom}
            onPress={() => navigation.navigate("LoginPage")}
          >
            <Text style={styles.BottomButtomText}>Get started</Text>
          </TouchableOpacity>
          <Text style={styles.BottomButtomCapText}>
            Already have an account?
            <TouchableOpacity
              style={{ color: "#FF7B8A" }}
              onPress={() => navigation.navigate("LoginPage")}
            >
              Login
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
    color: "white",
    top: 73,
    left: 30,
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
    lineHeight: 33,
    marginBottom: 15,
  },

  Instruction: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    top: "20%",
    height: "40%",
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
  WelcomePageImg: {
    width: 267,
    height: 240,

    bottom: "20%",
  },

  WelcomeLogo: {
    width: 70,
    height: 70,

    bottom: "100%",
  },

  input: {
    height: 40,
    margin: 12,
    width: 270,
    borderBottomWidth: 1,
    textAlign: "center",
  },

  BackArrow: {
    width: 10,
    height: 17,
    marginLeft: 30,
    marginTop: 30,
  },
});
