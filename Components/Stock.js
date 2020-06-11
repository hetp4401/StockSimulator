import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";

import { av_key } from "../config";

import { LineChart } from "react-native-chart-kit";

const Stock = ({ route, navigation }) => {
  const { ticker, name } = route.params.x;

  const [slables, setslables] = useState([""]);
  const [prices, setprices] = useState([0]);
  const [price, setprice] = useState("");
  const [high, sethigh] = useState("");
  const [low, setlow] = useState("");
  const [volume, setvolume] = useState("");
  const [change, setchange] = useState("");

  const get_intraday = (interval) => {
    fetch(
      "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
        ticker +
        "&interval=" +
        interval +
        "min&apikey=" +
        av_key
    )
      .then((res) => res.json())
      .then((resJson) => {
        const raw_data = resJson["Time Series (" + interval + "min)"];
        const processed_data = [];
        const label_data = [];
        var counter = 1;
        for (const obj in raw_data) {
          const price = raw_data[obj];
          processed_data.unshift(parseFloat(price["1. open"]));
          label_data.unshift(
            counter % 20 == 0 || counter == 1 ? obj.substr(-8, 5) : ""
          );
          counter += 1;
        }
        setprices(processed_data);
        setslables(label_data);
      })
      .catch((error) => {
        Alert.alert(error);
      });
  };

  const get_quote = () => {
    fetch(
      "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +
        ticker +
        "&apikey=" +
        av_key
    )
      .then((res) => res.json())
      .then((resJson) => {
        const data = resJson["Global Quote"];
        const vals = Object.values(data);
        setprice(vals[4]);
        sethigh(vals[2]);
        setlow(vals[3]);
        setvolume(vals[5]);
        setchange(vals[9]);
      });
  };

  useEffect(() => {
    get_intraday(5);
    get_quote();
  }, []);

  return (
    <View style={{ alignItems: "center" }}>
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
          labels: slables,
          datasets: [
            {
              data: prices,
            },
          ],
        }}
        width={Dimensions.get("window").width * 0.95} // from react-native
        height={320}
        chartConfig={{
          backgroundGradientFrom: "#ebebeb",
          backgroundGradientTo: "#ffffff",
          fillShadowGradientOpacity: 0.1,
          decimalPlaces: 2,
          color: () => `rgba(5, 134, 255, ${100})`,
          labelColor: () => `rgba(0, 0, 0, ${100})`,
          style: {
            borderRadius: 30,
            paddingRight: 3,
          },
          propsForDots: {
            r: "1",
            strokeWidth: "0",
            stroke: "#0586ff",
            strokeOpacity: 1,
          },
          propsForLabels: {
            fontFamily: "Verdana",
            lengthAdjust: true,
          },
        }}
        style={{
          borderRadius: 13,
          alignContent: "center",
        }}
        withInnerLines={false}
        segments={5}
      />

      <View style={{ alignItems: "center" }}>
        <Text>{"price - " + price}</Text>
        <Text>{"high - " + high}</Text>
        <Text>{"low - " + low}</Text>
        <Text>{"volume - " + volume}</Text>
        <Text
          style={change.includes("-") ? { color: "red" } : { color: "green" }}
        >
          {change}
        </Text>
      </View>
    </View>
  );
};

export default Stock;
