import React, { useEffect, useState } from "react";
import {
  FlatList,
  Button,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Spinner from "react-native-loading-spinner-overlay";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import {
  Dimensions,
  TouchableHighlight,
  Image,
  TouchableOpacity,
} from "react-native";

export default function TestingSensorPage({ route, navigation }) {
  const pressHandler = () => {
    navigation.navigate("TestingLoadingPage");
  };

  const [isLoading, setLoding] = useState(true);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [description, setDescription] = useState([]);
  console.log(data);

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    const { selectedValue } = route.params;
  }, [route]);

  const getUserDetails = () => {
    fetch("http://127.0.0.1:5000/test_sensors", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        json.conductivity_sensor &&
        json.ph_sensor &&
        json.temperature_ &&
        json.turbidity_sensor
          ? setIsDisabled(false)
          : setIsDisabled(true);
      });

    var monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
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
          <LinearGradient
            colors={["#020058", "#030096"]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 1 }}
            style={styles.headContent}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("LocationInput")}
            >
              <Image
                source={require("../assets/back-arrow.png")}
                style={styles.BackArrow}
              />
            </TouchableOpacity>
            <Text style={styles.HeadText}>Quality Test</Text>
            <Text style={styles.HeadTextCap}>Water quality results</Text>
          </LinearGradient>
        </View>

        <View style={styles.InnerHeadContent}>
          <Text style={styles.InnerHeadText}>Sensor testing</Text>
          <Text style={styles.InnerHeadTextCap}>
            make sure all the sensors are in water
          </Text>
        </View>

        <View style={styles.Instruction}>
          <TouchableOpacity
            style={[
              (data || {}).temperature_ ? styles.TestPass : styles.TestFail,
              styles.CheckButton,
            ]}
          >
            <Image
              source={require("../assets/check-circle-white.png")}
              style={styles.StartLogo}
            />
            <Text style={styles.CheckButtonText}>
              Tempurature sensor
              {"\n"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              (data || {}).ph_sensor ? styles.TestPass : styles.TestFail,
              styles.CheckButton,
            ]}
          >
            <Image
              source={require("../assets/check-circle-white.png")}
              style={styles.StartLogo}
            />
            <Text style={styles.CheckButtonText}>
              pH sensor
              {"\n"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              (data || {}).turbidity_sensor ? styles.TestPass : styles.TestFail,
              styles.CheckButton,
            ]}
          >
            <Image
              source={require("../assets/check-circle-white.png")}
              style={styles.StartLogo}
            />
            <Text style={styles.CheckButtonText}>
              Turbidity sensor
              {"\n"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              (data || {}).conductivity_sensor
                ? styles.TestPass
                : styles.TestFail,
              styles.CheckButton,
            ]}
          >
            <Image
              source={require("../assets/check-circle-white.png")}
              style={styles.StartLogo}
            />
            <Text style={styles.CheckButtonText}>
              Conductivity sensor
              {"\n"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.BottomButtomContainer}>
          <TouchableOpacity
            style={[
              isDisabled ? styles.testedSensorsFailed : styles.BottomButtom,
              isDisabled ? styles.testedSensorsPassed : styles.BottomButtom,
              styles.BottomButtom,
            ]}
            onPress={pressHandler}
          >
            <Text style={styles.BottomButtomText}>Next</Text>
          </TouchableOpacity>
          <Text style={styles.BottomButtomCapText}>
            How to use this device?{" "}
            <Text style={{ color: "#FF7B8A" }}>More info</Text>
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

  testedSensorsFailed: {
    backgroundColor: "#B2B2B2",
  },
  testedSensorsPassed: {
    backgroundColor: "#030082",
  },

  BottomButtom: {
    width: "40%",
    borderRadius: 11,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },

  BottomButtomText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "SFProRounded",
  },

  BottomButtomCapText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#515151",
    marginTop: 10,
    fontFamily: "SFProRounded",
  },

  BottomButtomCapTextLink: {
    color: "#FF00F5",
  },

  TestFail: {
    backgroundColor: "#EAEAEA",
    borderColor: "#CECECE",
  },
  TestPass: {
    backgroundColor: "#A8FFD5",
    borderColor: "#7AFFBF",
  },

  CheckButton: {
    width: "70%",
    borderRadius: 11,
    height: 60,
    alignItems: "center",

    borderWidth: 2,

    flexDirection: "row",
    margin: "2%",
  },

  CheckButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#00397C",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "SFProRounded",
    lineHeight: 18,
    width: "70%",
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

  CheckBtnTxtCap: {
    fontSize: 13,
    color: "#626263",
    fontFamily: "SFProRounded",
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
    fontFamily: "SFProRounded",
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

  InnerHeadTextCap: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "SFProRounded",
    color: "#626263",
    marginTop: 0,
    paddingLeft: 80,
    paddingRight: 80,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },

  Instruction: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    bottom: "-10%",
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
    color: "rgba(81, 81, 81, 0.86)",
    fontSize: 17,
    fontWeight: "700",
  },

  StartLogo: {
    width: 25,
    height: 25,
    marginRight: "7%",
    marginLeft: "7%",
    marginTop: 2,
  },

  BackArrow: {
    width: 10,
    height: 17,
    marginLeft: 30,
    marginTop: 30,
  },
});
