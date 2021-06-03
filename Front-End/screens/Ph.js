import React, { useEffect, useState } from "react";
import {
  FlatList,
  Button,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
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

import { Dimensions, TouchableHighlight } from "react-native";
import { useSelector } from "react-redux";

export default function MonthlyResults({ navigation }) {
  const userName = useSelector((state) => state.initialReducer.user);
  const [currentDate, setCurrentDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");

  useEffect(() => {
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
    var date = new Date().getDate();
    var month = monthNames[new Date().getMonth()];

    setCurrentDate(date);
    setCurrentMonth(month);
  }, []);

  const getWaterType = (waterType) => {
    if (waterType == "Excellent") {
      return 1;
    }
    if (waterType == "Normal") {
      return 2;
    }
    if (waterType == "Bad") {
      return 3;
    }
  };

  const handleItemClick = (event) => {
    navigation.navigate("WaterTestingScreen", { data: event });
  };

  const [isLoading, setLoding] = useState(true);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState([]);
  console.log(data);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => alert(error))
      .finally(() => setLoding(false));
  }, []);

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
            <Text style={styles.HeadText}>{userName}</Text>
            <Text style={styles.HeadTextCap}>Water quality results</Text>

            <Image
              source={require("../assets/calendar-blue.png")}
              style={styles.CalendarImg}
            />

            <FlatList
              data={data.articles}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleItemClick("TESTING")}>
                  <Text>{item.title}esfeefe</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </LinearGradient>
        </View>

        <View style={styles.StatusContainer}>
          <LinearGradient
            colors={["#EEF2FF", "#ffffff"]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 1 }}
            style={styles.headContent}
          >
            <View style={styles.resultsContainer}>
              <View style={styles.previousContainer}>
                <Image
                  source={require("../assets/select-arrow-blue.png")}
                  style={styles.SelectArrow}
                />
                <Text style={styles.slctCntnrTxt}>Previous results</Text>
                <Text style={styles.slctCntnrTxtCap}>
                  Water quality results
                </Text>
                <Text
                  style={[
                    getWaterType(data.predicted_water_type) == 1
                      ? styles.excellentQlt
                      : styles.selectDate,
                    getWaterType(data.predicted_water_type) == 2
                      ? styles.normalQlt
                      : styles.selectDate,
                    getWaterType(data.predicted_water_type) == 3
                      ? styles.badQlt
                      : styles.selectDate,

                    styles.selectDate,
                  ]}
                >
                  {currentDate}
                  {"\n"}
                  <Text style={{ fontSize: 11, fontWeight: "500" }}>
                    {currentMonth}
                  </Text>
                </Text>
              </View>
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

  BackArrow: {
    width: 10,
    height: 17,
    marginLeft: 30,
    marginTop: 30,
  },

  CalendarImg: {
    position: "absolute",
    top: "46%",
    right: "6%",
    width: 38,
    height: 41,
  },

  SelectArrow: {
    position: "absolute",
    width: 8,
    height: 15,
    top: "45%",
    right: 30,
    opacity: 0.7,
  },

  excellentQlt: {
    backgroundColor: "#37E290",
    borderColor: "#37E290",
  },
  normalQlt: {
    backgroundColor: "#0099C9",
    borderColor: "#0099C9",
  },
  badQlt: {
    backgroundColor: "#FF7B8A",
    borderColor: "#FF7B8A",
  },

  selectDate: {
    position: "absolute",
    fontSize: 19,
    fontWeight: "bold",
    color: "white",
    top: "30%",
    left: 30,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    paddingBottom: 10,
    paddingTop: 10,
    lineHeight: 15,
    textAlign: "center",
    fontFamily: "SFProRounded",
  },

  Measurement: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#020058",
  },

  HeadText: {
    position: "absolute",

    fontSize: 23,
    fontWeight: "bold",
    color: "#00397C",
    top: 63,
    left: 30,
    fontFamily: "SFProRounded",
  },

  HeadTextCap: {
    position: "absolute",
    fontSize: 14,
    color: "rgba(0, 20, 124, 0.86)",
    top: 93,
    left: 30,
    fontFamily: "SFProRounded",
  },

  slctCntnrTxt: {
    position: "absolute",
    fontSize: 22,
    fontWeight: "bold",
    color: "#00397C",
    top: "27%",
    left: 80,
    fontFamily: "SFProRounded",
  },

  slctCntnrTxtCap: {
    position: "absolute",
    fontSize: 14,
    fontWeight: "600",
    color: "#626263",
    top: "51%",
    left: 80,
    paddingTop: 3,
    fontFamily: "SFProRounded",
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
    top: "20%",
    height: "100%",
  },

  StatusBarContainerHead: {
    width: deviceWidth,

    height: "65%",
    bottom: 0,
    top: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
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
    color: "black",
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
    height: "20%",
  },
  previousContainer: {
    width: deviceWidth,
    top: "5%",
    height: "13%",
    backgroundColor: "white",
    borderStyle: "solid",

    borderBottomWidth: 1,
    borderColor: "#D3D3D3",
  },
  resultsContainer: {
    flex: 1,
    position: "absolute",
    width: deviceWidth,

    height: "100%",
    backgroundColor: "white",
    borderStyle: "solid",
    borderWidth: 0,
    borderColor: "#D3D3D3",
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,

    elevation: 12,
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
    top: 50,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginTop: 120,
  },

  PieHead: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#020058",
  },
});
