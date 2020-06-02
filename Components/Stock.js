import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";

import { av_key } from "../config";

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
        <View style= {{marginTop: 50}}></View>
      <Text>{ticker + " - " + name}</Text>
      <Text>{response}</Text>
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
    </View>
  );
};

export default Stock;
