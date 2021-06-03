import React, { useEffect, useState } from "react";
import {
  FlatList,
  Button,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import { Dimensions, TouchableHighlight, TouchableOpacity } from "react-native";

export default function WaterTestingSecond({ route, navigation }) {
  const user = useSelector((state) => state.initialReducer.user);
  const [userDetails, setUserDetails] = useState({});
  const monthNames = [
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

  useEffect(() => {
    const { data, testResults } = route.params;
    if ((data || {}).userData) {
      setUserDetails({
        data: data.userData,
        username: data.userName,
        result: data.userData.result,
        date: data.userData.result.date,
        ph: data.userData.result.ph,
        month: data.userData.result.month,
        turbidity: data.userData.result.turbidity,
        conductivity: data.userData.result.conductivity,
        temperature: data.userData.result.temperature,
        location: data.userData.result.tested_location,
        predicted_water_type: data.userData.result.predicted_water_type,
      });
    }

    if ((data || {}).item) {
      setUserDetails({
        date: data.item.date,
        ph: data.item.ph,
        month: data.item.month,
        turbidity: data.item.turbidity,
        conductivity: data.item.conductivity,
        temperature: data.item.temperature,
        location: data.item.tested_location,
        predicted_water_type: data.item.predicted_water_type,
      });
    }

    if (testResults) {
      setUserDetails({
        date: testResults.date,
        ph: testResults.ph,
        month: testResults.month,
        turbidity: testResults.turbidity,
        conductivity: testResults.conductivity,
        temperature: testResults.temperature,
        location: testResults.location,
        predicted_water_type: testResults.predicted_water_type,
      });
    }
  }, [route]);

  const [userData, setUserData] = useState([]);

  const getWaterType = (waterType) => {
    if (waterType == "Excellent") {
      return 1;
    }
    if (waterType == "Normal") {
      return 2;
    }
    if (waterType == "Poor") {
      return 3;
    }
    if (waterType == "Very Poor") {
      return 4;
    }
    if (waterType == "Unsuitable") {
      return 4;
    }
  };

  const getMonth = (month) => {
    return monthNames[month];
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
            colors={["#EEF2FF", "#ffffff"]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 1 }}
            style={styles.headContent}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
              <Image
                source={require("../assets/back-arrow-blue.png")}
                style={styles.BackArrow}
              />
            </TouchableOpacity>

            <Text style={styles.HeadText}>Quality test</Text>
            <Text style={styles.HeadTextCap}>Water quality results</Text>
            <Text style={styles.Date}>
              {(userDetails || {}).date}
              {"\n"}
              <Text style={{ fontSize: 11, fontWeight: "500" }}>
                {getMonth((userDetails || {}).month)}
              </Text>
            </Text>
          </LinearGradient>
        </View>

        <View style={styles.StatusContainer}>
          <LinearGradient
            colors={["#EEF2FF", "#ffffff"]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 1 }}
            style={styles.headContent}
          >
            <View
              style={[
                getWaterType((userDetails || {}).predicted_water_type) == 1
                  ? styles.excellent
                  : styles.StatusBarHead,
                getWaterType((userDetails || {}).predicted_water_type) == 2
                  ? styles.normal
                  : styles.StatusBarHead,
                getWaterType((userDetails || {}).predicted_water_type) == 3
                  ? styles.bad
                  : styles.StatusBarHead,
                getWaterType((userDetails || {}).predicted_water_type) == 4
                  ? styles.Vbad
                  : styles.StatusBarHead,
                getWaterType((userDetails || {}).predicted_water_type) == 4
                  ? styles.Vbad
                  : styles.StatusBarHead,
                styles.StatusBarContainerHead,
              ]}
            >
              <Text style={styles.StatusBarHead}>
                {(userDetails || {}).predicted_water_type} quality
              </Text>

              <View style={styles.StatusBarContainer}>
                <TouchableHighlight>
                  <Text style={styles.StatusBarLeft}>
                    <Text style={styles.Measurement}>Tempurature</Text>
                    {"\n"}
                    {(userDetails || {}).temperature}°C
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight>
                  <Text style={styles.StatusBar}>
                    <Text style={styles.Measurement}>pH</Text>
                    {"\n"}
                    {(userDetails || {}).ph}
                  </Text>
                </TouchableHighlight>
              </View>
              <View style={styles.StatusBarContainer2}>
                <TouchableHighlight>
                  <Text style={styles.StatusBarLeft}>
                    <Text style={styles.Measurement}>Conductivity</Text>
                    {"\n"}
                    {(userDetails || {}).conductivity} (S/m)
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight>
                  <Text style={styles.StatusBar}>
                    <Text style={styles.Measurement}>Turbidity</Text>
                    {"\n"}
                    {(userDetails || {}).turbidity} Ntu
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
            <View style={styles.locationBlock}>
              <Image
                source={require("../assets/location-pin-red.png")}
                style={styles.locationPin}
              />
              <Text style={styles.locationTxt}>
                {(userDetails || {}).location}
              </Text>
            </View>
          </LinearGradient>
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

let deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  BackArrow: {
    width: 10,
    height: 17,
    marginLeft: 30,
    marginTop: 50,
  },

  SelectArrow: {
    position: "absolute",
    width: 8,
    height: 15,
    top: "45%",
    right: 30,
    opacity: 0.7,
  },

  Date: {
    position: "absolute",

    fontSize: 19,
    fontWeight: "bold",
    color: "white",
    top: 95,
    right: 30,
    backgroundColor: "#030096",
    fontFamily: "SFProRounded",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#030096",
    borderRadius: 5,
    padding: 7,
    paddingTop: 15,
    paddingBottom: 16,
    lineHeight: 15,
    textAlign: "center",
  },
  selectDate: {
    position: "absolute",
    fontFamily: "SFProRounded",
    fontSize: 19,
    fontWeight: "bold",
    color: "white",
    top: "30%",
    left: 30,
    backgroundColor: "#030096",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#030096",
    borderRadius: 5,
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    lineHeight: 15,
    textAlign: "center",
  },

  Measurement: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#020058",
    fontFamily: "SFProRounded",

    lineHeight: 30,
  },

  HeadText: {
    position: "absolute",
    fontFamily: "SFProRounded",
    fontSize: 24,
    fontWeight: "bold",
    color: "#020058",
    top: 95,
    left: 30,
  },

  HeadTextCap: {
    position: "absolute",
    fontSize: 13,

    color: "rgba(0, 20, 124, 0.86)",
    fontFamily: "SFProRounded",
    top: 123,
    left: 30,
  },

  slctCntnrTxt: {
    position: "absolute",

    fontFamily: "SFProRounded",
    fontSize: 22,
    fontWeight: "bold",
    color: "#020058",
    top: "27%",
    left: 80,
  },

  slctCntnrTxtCap: {
    position: "absolute",
    fontSize: 12,

    fontFamily: "SFProRounded",
    color: "rgba(0, 20, 124, 0.86)",
    top: "51%",
    left: 80,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#EFFBFF",
  },

  PhButtonContainer: {
    bottom: 0,

    alignItems: "center",

    backgroundColor: "transparent",
    marginTop: 0,
  },
  TempButtonContainer: {
    alignItems: "center",

    backgroundColor: "transparent",
    marginTop: 0,
  },
  TurbidityButtonContainer: {
    alignItems: "center",

    backgroundColor: "transparent",
    marginTop: 0,
  },
  CondctButtonContainer: {
    alignItems: "center",

    backgroundColor: "transparent",
    marginTop: 0,
  },

  StatusContainer: {
    width: deviceWidth,
    top: "25%",
    height: "60%",
  },

  excellent: {
    backgroundColor: "#37E290",
  },
  normal: {
    backgroundColor: "#0099C9",
  },
  bad: {
    backgroundColor: "#FF7B8A",
  },
  Vbad: {
    backgroundColor: "#990500",
  },

  StatusBarContainerHead: {
    width: deviceWidth - 40,
    marginLeft: 20,
    height: "65%",
    bottom: 0,
    top: 0,
    alignItems: "center",
    justifyContent: "center",

    marginTop: 0,
    marginBottom: 0,

    borderStyle: "solid",
    borderWidth: 0,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,

    elevation: 12,
  },

  StatusBarHead: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    fontFamily: "SFProRounded",
  },

  StatusBarContainer: {
    width: deviceWidth - 38,

    bottom: 0,
    top: "7.5%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 0,
    marginBottom: 0,
    flexDirection: "row",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#808080",
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,
  },

  StatusBarContainer2: {
    width: deviceWidth - 38,

    bottom: 0,
    top: "7.3%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 0,
    marginBottom: 0,
    flexDirection: "row",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "white",
    borderBottomEndRadius: 25,
    borderBottomLeftRadius: 25,
  },

  StatusBar: {
    width: deviceWidth / 2 - 20,
    fontSize: 20,
    fontFamily: "SFProRounded",

    textAlign: "center",
    padding: "15%",
    paddingBottom: "18%",
    alignContent: "center",
    justifyContent: "center",

    backgroundColor: "transparent",
  },
  StatusBarLeft: {
    width: deviceWidth / 2 - 20,
    fontSize: 20,

    borderRightWidth: 1,

    textAlign: "center",
    padding: "15%",
    paddingBottom: "18%",
    alignContent: "center",
    justifyContent: "center",

    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "transparent",
  },

  headContainer: {
    flex: 1,
    position: "absolute",
    width: deviceWidth,
    height: "30%",
  },

  locationBlock: {
    position: "absolute",
    width: deviceWidth,

    height: "10%",
    top: "68%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  locationPin: {
    width: 20,
    height: 23.9,
    marginLeft: 10,
    marginRight: 10,
  },

  locationTxt: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SFProRounded",
  },

  previousContainer: {
    flex: 1,
    position: "absolute",
    width: deviceWidth,
    top: "73%",
    height: "15%",
    backgroundColor: "white",
    borderStyle: "solid",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#D3D3D3",
  },
  headContent: {
    flex: 1,
  },

  PhButton: {
    width: 150,
    borderWidth: 1,
    padding: 25,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderColor: "rgba(0, 0, 0, 0.5)",
    backgroundColor: "white",
  },
  TempButton: {
    width: 150,
    borderWidth: 1,
    padding: 25,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderColor: "rgba(0, 0, 0, 0.5)",
    backgroundColor: "white",
  },
  TurbidityButton: {
    width: 150,
    borderWidth: 1,
    padding: 25,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderColor: "rgba(0, 0, 0, 0.5)",
    backgroundColor: "white",
  },
  CondctButton: {
    width: 150,
    borderWidth: 1,
    padding: 25,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderColor: "rgba(0, 0, 0, 0.5)",
    backgroundColor: "white",
  },

  pieChart: {
    top: 50,
    left: -50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginTop: 120,
  },

  pieChartContainer: {
    top: "15%",

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginTop: 120,
    fontFamily: "SFProRounded",
  },

  PieHead: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#020058",
    fontFamily: "SFProRounded",
  },
});
