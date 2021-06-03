import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import { Dimensions } from "react-native";
import { ActivityIndicator } from "react-native";

export default function App() {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.headContainer}>
          <LinearGradient
            colors={["#020058", "#030096"]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 1 }}
            style={styles.headContent}
          >
            <View style={styles.LogoText}>
              <Text style={styles.LogoText}>JalaRead</Text>
              <Text style={styles.LogoCapText}>Water Quality Tester</Text>
            </View>
            <Image
              source={require("../assets/jala-read-logo.png")}
              style={styles.StartLogo}
            />
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}

const dataPieChart = {
  labels: ["pH", "Temp", "Turbidity"],
  data: [0.4, 0.7, 0.8],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#EFFBFF",
  },
  headContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  headContent: {
    flex: 1,

    height: "100%",

    alignItems: "center",
  },

  LogoText: {
    fontSize: 23,
    fontWeight: "bold",
    alignItems: "center",
    top: 590,
    color: "rgba(255, 255, 255, 0.9)",
    fontFamily: "SFProRounded",
  },
  LogoCapText: {
    fontSize: 14,
    alignItems: "center",

    top: 670,
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: "SFProRounded",
  },

  StartLogo: {
    top: 200,

    width: 100,
    height: 100,
  },
});
