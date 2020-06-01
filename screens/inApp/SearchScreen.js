import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";

import { av_key } from "../../config";

const SearchScreen = () => {
  const [stocks, setstocks] = useState([]);
  const [search, setsearch] = useState("");

  const topResults = () => {
    if (search.length > 0) {
      fetch(
        "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" +
          search +
          "&apikey=" +
          av_key,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          const results = responseJson["bestMatches"];
          const top = results.map((x) => x["1. symbol"] + " - " + x["2. name"]);
          setstocks(top);
        })
        .catch((error) => {
          Alert.alert(error);
        });
    } else {
      setsearch("");
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="search stock"
        onChangeText={(text) => setsearch(text)}
        value={search}
      ></TextInput>
      <View>
        <TouchableOpacity
          onPress={topResults}
          style={{
            marginTop: 30,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Text
            style={{
              color: "red",
            }}
          >
            SEARCH
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        {stocks.map((x, i) => (
          <Text key={i}>{x}</Text>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    fontWeight: "800",
    fontSize: 30,
    fontStyle: "normal",
    color: "#514e5a",
    marginTop: 32,
  },
  input: {
    marginTop: 32,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#BAB7C3",
    paddingHorizontal: 16,
    borderRadius: 30,
    color: "#514e5a",
    fontWeight: "600",
  },
});

export default SearchScreen;
