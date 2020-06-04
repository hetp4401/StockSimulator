import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";

import { av_key } from "../config";

import { LineChart } from "react-native-chart-kit";

const Stock = ({ route, navigation }) => {
  const { ticker, name } = route.params.x;

  const [response, setresponse] = useState("");
  const [pricedata, setpricedata] = useState([0]);

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
        const raw_data = resJson["Time Series (" + interval + "min)"];
        const processed_data = [];
        for (const obj in raw_data) {
          const price = raw_data[obj];
          processed_data.push(parseFloat(price["1. open"]));
        }
        setpricedata(processed_data);
      })
      .catch((error) => {
        Alert.alert(error);
      });
  };

  useEffect(() => {
    get_intraday(5);
  }, [])

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
          datasets: [
            {
              data: pricedata,
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={320}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFromOpacity: "#fb8c00",
          backgroundGradientToOpacity: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(31, 218, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius:0,
          },
          propsForDots: {
            r: "1",
            strokeWidth: "1",
            stroke: "#269dff",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 5,
        }}
        withInnerLines={false}
      />
    </View>
  );
};

export default Stock;
