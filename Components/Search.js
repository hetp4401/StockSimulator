import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";

import { av_key } from "../config";

const Search = ({ navigation }) => {
  const [stocks, setstocks] = useState([]);
  const [search, setsearch] = useState("");

  const topResults = () => {
    if (search.length > 0) {
      fetch(
        "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" +
          search +
          "&apikey=" +
          av_key
      )
        .then((res) => res.json())
        .then((resJson) => {
          const results = resJson["bestMatches"];
          const top = results.map((x) => {
            return {
              ticker: x["1. symbol"],
              name: x["2. name"],
            };
          });
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
              marginLeft: 20,
            }}
          >
            SEARCH
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        {stocks.map((x, i) => (
          <TouchableOpacity
            style={styles.list}
            key={i}
            onPress={() => navigation.navigate("stock", { x })}
          >
            <Text>{x.ticker + " - " + x.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 52,
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#BAB7C3",
    paddingHorizontal: 16,
    borderRadius: 30,
    color: "#514e5a",
    fontWeight: "600",
  },
  list: {
    marginTop: 20,
    marginLeft: 20,
  },
});

export default Search;
