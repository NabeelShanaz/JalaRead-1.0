import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
// import CircleChart from "react-native-circle-chart";
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

export default function Example({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://reactnative.dev/movies.json")
      .then((response) => response.json())
      .then((json) => setData(json.movies))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>
              {item.title}, {item.releaseYear}
            </Text>
          )}
        />
      )}
    </View>
  );
}

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
  },
  LogoCapText: {
    fontSize: 14,
    alignItems: "center",
    top: 670,
    color: "rgba(255, 255, 255, 0.7)",
  },

  StartLogo: {
    top: 200,
    width: 100,
    height: 100,
  },
});
