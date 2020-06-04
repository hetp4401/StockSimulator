import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

import { av_key } from "../config";

import { LineChart } from "react-native-chart-kit";

const Stock = ({ route, navigation }) => {
  const { ticker, name } = route.params.x;

  const [response, setresponse] = useState("");

  const get_intraday = (interval) => {
    fetch(
      "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
        ticker +
        "&interval=" +
        interval +
        "min&apikey=" +
        av_key,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((resJson) => {
        setresponse(JSON.stringify(resJson));
      })
      .catch((error) => {
        Alert.alert(error);
      });
  };

  return (
    <View>
      <View style={{ marginTop: 50 }}></View>
      <Text>{ticker + " - " + name}</Text>
      <View style={{ alignItems: "center", marginTop: 30 }}>
        <TouchableOpacity onPress={() => get_intraday(1)}>
          <Text>1min</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => get_intraday(5)}>
          <Text>5min</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => get_intraday(15)}>
          <Text>15min</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => get_intraday(30)}>
          <Text>30min</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => get_intraday(60)}>
          <Text>60min</Text>
        </TouchableOpacity>
      </View>

      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFromOpacity: "#fb8c00",
          backgroundGradientToOpacity: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default Stock;
