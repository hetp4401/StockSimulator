import React, { useState, useEffect, Slid } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Button,
  Alert,
  Slider,
} from "react-native";
import { av_key } from "../config";
import {db,auth} from "../firebase"
import Chart from "./Chart";
import ArticleLink from "./ArticleLink";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getBalance } from "../firebase";
import firebase from "firebase"

const Parser = require("fast-html-parser");

const Stock = ({ route, navigation }) => {
  const { ticker, name } = route.params.x;

  const [slables, setslables] = useState([""]);
  const [prices, setprices] = useState([0]);
  const [price, setprice] = useState("");
  const [high, sethigh] = useState("");
  const [low, setlow] = useState("");
  const [volume, setvolume] = useState("");
  const [change, setchange] = useState("");
  const [favourite, setfavourite] = useState(false);

  const [links, setlinks] = useState([]);

  const [loading, setloading] = useState(true);
  const [loading2, setloading2] = useState(true);

  const [selected, setselected] = useState(5);

  const check_favourite = () =>{
    db.collection("users").doc(auth().currentUser.uid).get()
      .then(doc =>{
        doc.data().watchlist.map((x,i)=> {
          if (x.ticker === ticker){
            console.log(x.ticker);
            setfavourite(true);
          };
        });
    });
    console.log(favourite + "on check")
  }
  
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
        setloading(false);
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

  const get_news = () => {
    fetch("https://www.bing.com/news/search?q=" + name)
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
        setloading2(false);
      });
  };

  const change_select = (x) => {
    setselected(x);
    get_intraday(x);
  };

  const handleChange =() =>{
    setfavourite(prevState => !prevState);
    Alert.alert(
      `${ticker} ${!favourite ? 'added to' : 'removed from'} Watchlist`
    )

    console.log(favourite +" on handlechange")
    
    if(!favourite) {
      db.collection("users")
      .doc(auth().currentUser.uid)
      .update({
        watchlist : firebase.firestore.FieldValue.arrayUnion({
          ticker,
          name,
          volume,
          price,
        }),
      })
      .then(() => {})
      .catch(function (error) {
        console.error(error);
      });
    }else{
      db.collection("users")
      .doc(auth().currentUser.uid)
      .update({
        watchlist : firebase.firestore.FieldValue.arrayRemove({
          ticker,
          name,
          volume,
          price,
        }),
      })
      .then(() => {})
      .catch(function (error) {
        console.error(error);
      });
    }
  };

  useEffect(() => {
    get_intraday(5);
    get_quote();
    get_news();
    check_favourite();
  }, []);

  return loading ? (
    <ActivityIndicator
      size={100}
      color="#0000ff"
      style={{ marginTop: Dimensions.get("window").height * 0.5 }}
    />
  ) : (
    <ScrollView>
      <View style={{ marginTop: 50 }}></View>
      <Text>{ticker + " - " + name}</Text>
      <View style={{ alignItems: "center", marginTop: 30 }}>
        <TouchableOpacity onPress={() => change_select(1)}>
          <Text style={selected == 1 ? { color: "red" } : { color: "black" }}>
            1min
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change_select(5)}>
          <Text style={selected == 5 ? { color: "red" } : { color: "black" }}>
            5min
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change_select(15)}>
          <Text style={selected == 15 ? { color: "red" } : { color: "black" }}>
            15min
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change_select(30)}>
          <Text style={selected == 30 ? { color: "red" } : { color: "black" }}>
            30min
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change_select(60)}>
          <Text style={selected == 60 ? { color: "red" } : { color: "black" }}>
            60min
          </Text>
        </TouchableOpacity>
      </View>

      <Chart slables={slables} prices={prices}></Chart>

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

      <View style = {{alignItems: "center", display: "flex", flexDirection: "row" ,alignContent:"center", justifyContent:"center" }}>
        <Ionicons 
          name={favourite ? "ios-star" : "ios-star-outline"}
          size ={30} 
          color={'blue'} 
          onPress = {handleChange}
        />

        <Button
          title= {!favourite ?'Add to watchlist' : 'Remove from watchlist'}
          onPress = {handleChange} 
        />
      </View> 

      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />

      <Text style={{ marginLeft: 20, marginTop: 30 }}>Latest News</Text>

      <View>
        {loading2 ? (
          <ActivityIndicator
            size="small"
            color="#0000ff"
            style={{ marginTop: 20 }}
          />
        ) : (
          links.map((x, i) => {
            return <ArticleLink x={x} key={i} />;
          })
        )}
      </View>
    </ScrollView>
  );
};

export default Stock;
