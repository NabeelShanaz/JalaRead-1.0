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

import { Dimensions, TouchableHighlight, Image, Picker } from "react-native";

export default function LocationInpitPage({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const [text, onChangeText] = React.useState("location ");
  const [number, onChangeNumber] = React.useState(null);
  const [selectedValue, setSelectedValue] = React.useState("");

  return (
    <View style={{ flex: 1, padding: 0, backgroundColor: "white" }}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.headContainer}>
            <LinearGradient
              colors={["#020058", "#030096"]}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 1 }}
              style={styles.headContent}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("TestingPage")}
              >
                <Image
                  source={require("../assets/back-arrow.png")}
                  style={styles.BackArrow}
                />
              </TouchableOpacity>

              <Text style={styles.HeadText}>Quality test</Text>
              <Text style={styles.HeadTextCap}>Water quality results</Text>
            </LinearGradient>
          </View>

          <View style={styles.InnerHeadContent}>
            <Text style={styles.InnerHeadText}>Your Location</Text>
          </View>

          <View style={styles.Instruction}>
            <Image
              source={require("../assets/my-location.svg")}
              style={styles.locationPin}
            />
            <Text style={styles.InstructionText}>
              Enter your current
              {"\n"}
              location
            </Text>
            <View style={styles.location}>
              <Picker
                selectedValue={selectedValue}
                style={{
                  position: "absolute",
                  height: 30,
                  width: 200,
                  marginHorizontal: 10,
                  marginVertical: 20,
                  borderStyle: "solid",
                  boderWidth: 0,
                  borderBottomWidth: 1,
                  borderRadius: 3,
                  left: -111,
                  fontFamily: "SFProRounded",
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
              >
                <Picker.Item label="Choose" value="" />
                <Picker.Item label="Matara" value="matara" />
                <Picker.Item label="Anuradhapura" value="anuradhapura" />
                <Picker.Item label="Jaffna" value="jaffna" />
                <Picker.Item label="Kalutara" value="kalutara" />
              </Picker>
            </View>
          </View>
          <View style={styles.BottomButtomContainer}>
            {selectedValue !== "" ? (
              <TouchableOpacity
                style={styles.BottomButtom}
                onPress={() =>
                  navigation.navigate("TestingSensorPage", { selectedValue })
                }
              >
                <Text style={styles.BottomButtomText}>Start</Text>
              </TouchableOpacity>
            ) : null}
            <Text style={styles.BottomButtomCapText}>
              How to use this device?{" "}
              <Text style={{ color: "#FF7B8A" }}>More info</Text>
            </Text>
          </View>
        </View>
      )}
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
    top: "20%",
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#00397C",
    fontFamily: "SFProRounded",
    bottom: 200,
  },

  Instruction: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    fontFamily: "SFProRounded",
    bottom: "-15%",
    height: "40%",
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
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: 5,
  },

  StartLogo: {
    width: 25,
    height: 25,
    marginRight: "10%",
    marginTop: 10,
  },
  locationPin: {
    width: 140,
    height: 123,
    bottom: "20%",
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
