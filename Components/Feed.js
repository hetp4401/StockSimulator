import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import ArticleLink from "../Components/ArticleLink";

const Parser = require("fast-html-parser");

const Feed = ({ navigation }) => {
  const [gainers, setgainers] = useState([]);
  const [losers, setlosers] = useState([]);
  const [actives, setactives] = useState([]);

  const [selected, setselected] = useState(1);
  const [links, setlinks] = useState([]);

  const get_yahoo = (category, setter) => {
    fetch("https://finance.yahoo.com/" + category)
      .then((res) => res.text())
      .then((body) => {
        const html = Parser.parse(body);
        const table = html
          .querySelector("#scr-res-table")
          .querySelectorAll("tr")
          .slice(1);

        const arr = [];

        table.forEach((x) => {
          const data = x.querySelectorAll("td");
          const t = data[0].querySelector("a").text;
          const n = data[0].querySelector("a").rawAttributes.title;
          const p = data[2].querySelector("span").text;
          const vc = data[3].querySelector("span").text;
          const pc = data[4].querySelector("span").text;
          const v = data[5].querySelector("span").text;

          arr.push({
            ticker: t,
            name: n,
            price: p,
            vchange: vc,
            pchange: pc,
            volume: v,
          });

          if (arr.length == 25) {
            setter(arr);
          }
        });
      });
  };

  const get_gainers = () => get_yahoo("gainers", setgainers);
  const get_losers = () => get_yahoo("losers", setlosers);
  const get_most_actives = () => get_yahoo("most-active", setactives);

  const get_news = (query) => {
    fetch("https://www.bing.com/news/search?q=" + query)
      .then((res) => res.text())
      .then((body) => {
        const html = Parser.parse(body);
        const arr = html.querySelectorAll(
          ".news-card.newsitem.cardcommon.b_cards2"
        );
        const urls = arr.map((x) => {
          const url = x.rawAttributes.url;
          const imgobj = x.querySelector("img").rawAttributes;
          const thumbnail =
            "https://www.bing.com" +
            ("data-src" in imgobj ? imgobj["data-src"] : imgobj.src);
          const sample = x.querySelector(".snippet").rawAttributes.title;
          return { link: url, img: thumbnail, snippet: sample };
        });
        setlinks(urls);
      });
  };

  useEffect(() => {
    setInterval(() => {
      get_gainers();
      get_losers();
      get_most_actives();
    }, 7000);
    get_gainers();
    get_losers();
    get_most_actives();
    get_news("finance");
  }, []);

  return (
    <ScrollView>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity onPress={() => setselected(0)}>
          <Text
            style={{
              ...{ margin: 10 },
              ...(selected == 0 ? { color: "orange" } : { color: "black" }),
            }}
          >
            Gainers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setselected(1)}>
          <Text
            style={{
              ...{ margin: 10 },
              ...(selected == 1 ? { color: "orange" } : { color: "black" }),
            }}
          >
            Most-Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setselected(2)}>
          <Text
            style={{
              ...{ margin: 10 },
              ...(selected == 2 ? { color: "orange" } : { color: "black" }),
            }}
          >
            Losers
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stock}>
        <Text style={{ width: "30%", marginLeft: 20 }}>Ticker</Text>
        <Text style={{ width: "23%", textAlign: "right" }}>Price</Text>
        <Text style={{ width: "23%", textAlign: "right" }}>24h</Text>
        <Text style={{ width: "23%", textAlign: "right", marginRight: 20 }}>
          Volume
        </Text>
      </View>

      {(selected == 1 ? actives : selected == 2 ? losers : gainers).map(
        (x, i) => (
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
                ...{ width: "23%", textAlign: "right", color: "#474747" },
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
        )
      )}

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
  },
});

export default Feed;
