import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import ArticleLink from "../Components/ArticleLink";

import { charts, trending, news } from "../lib/api";

const Feed = ({ navigation }) => {
  const [gainers, setgainers] = useState([]);
  const [losers, setlosers] = useState([]);
  const [actives, setactives] = useState([]);
  const [trendingarr, settrendingarr] = useState([]);
  const [selected, setselected] = useState(1);
  const [links, setlinks] = useState([]);

  const get_gainers = () => {
    charts("gainers").then((data) => {
      setgainers(data);
    });
  };

  const get_losers = () => {
    charts("losers").then((data) => {
      setlosers(data);
    });
  };

  const get_most_actives = () => {
    charts("most-active").then((data) => {
      setactives(data);
    });
  };

  const get_trending = () => {
    trending().then((data) => {
      settrendingarr(data);
    });
  };

  const get_news = () => {
    news().then((data) => {
      setlinks(data);
    });
  };

  useEffect(() => {
    setInterval(() => {
      get_gainers();
      get_losers();
      get_most_actives();
      get_trending();
    }, 30000);
    get_gainers();
    get_losers();
    get_most_actives();
    get_trending();
    get_news();
  }, []);

  return (
    <ScrollView>
      <View
        style={{
          paddingTop: 20,
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => setselected(0)}>
          <Text
            style={
              selected == 0 ? styles.selectedOption : styles.nonSelectedOption
            }
          >
            Gainers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setselected(1)}>
          <Text
            style={
              selected == 1 ? styles.selectedOption : styles.nonSelectedOption
            }
          >
            Most-Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setselected(2)}>
          <Text
            style={
              selected == 2 ? styles.selectedOption : styles.nonSelectedOption
            }
          >
            Losers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setselected(3)}>
          <Text
            style={
              selected == 3 ? styles.selectedOption : styles.nonSelectedOption
            }
          >
            Trending
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stock}>
        <Text style={{ width: "30%", marginLeft: 20, color: "#383838" }}>
          Ticker
        </Text>
        <Text style={{ width: "23%", textAlign: "right", color: "#383838" }}>
          Price
        </Text>
        <Text style={{ width: "23%", textAlign: "right", color: "#383838" }}>
          24h
        </Text>
        <Text
          style={{
            width: "23%",
            textAlign: "right",
            marginRight: 20,
            color: "#383838",
          }}
        >
          Volume
        </Text>
      </View>

      {(selected == 1
        ? actives
        : selected == 2
        ? losers
        : selected == 3
        ? trendingarr
        : gainers
      ).map((x, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => navigation.navigate("stock", { x })}
          style={styles.stock}
        >
          <Text style={{ width: "30%", marginLeft: 20, color: "#474747" }}>
            {x.ticker}
          </Text>
          <Text
            style={{
              width: "23%",
              textAlign: "right",
              color: "#474747",
            }}
          >
            {x.price}
          </Text>
          <Text
            style={{
              ...{ width: "23%", textAlign: "right" },
              ...(x.pchange.includes("+")
                ? { color: "green" }
                : { color: "red" }),
            }}
          >
            {x.pchange}
          </Text>
          <Text
            style={{
              width: "23%",
              textAlign: "right",
              marginRight: 20,
              color: "#474747",
            }}
          >
            {x.volume}
          </Text>
        </TouchableOpacity>
      ))}

      <Text style={{ marginLeft: 20, marginTop: 30 }}>Latest News</Text>

      {links.map((x, i) => {
        return <ArticleLink x={x} key={i} />;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  stock: {
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    borderTopWidth: 0,
    borderColor: "#ededed",
    padding: 3,
  },
  selectedOption: {
    margin: 10,
    fontWeight: "bold",
    color: "#1e2f85",
    fontSize: 18,
  },
  nonSelectedOption: {
    margin: 10,
    color: "grey",
  },
});

export default Feed;
