import React, { useState, useEffect, Slid } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Slider,
  Alert,
  Button,
  SafeAreaView
} from "react-native";
import { av_key } from "../config";
import Chart from "./Chart";
import ArticleLink from "./ArticleLink";
import { db, auth } from "../firebase";
import firebase from "firebase"
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  LineChart,
  StackedAreaChart,
  AreaChart,
  Grid,
  YAxis,
} from "react-native-svg-charts";
import { ClipPath, Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { BorderlessButton } from "react-native-gesture-handler";
import { inherits } from "util";

const Parser = require("fast-html-parser");

const Stock = ({ route, navigation }) => {
  const [account, setaccount] = useState({});
  const [balance, setbalance] = useState(0);
  const [owned, setowned] = useState(0);
  const [sliderb, setsliderb] = useState(0);
  const [sliders, setsliders] = useState(0);
  const [slidetest, setslidetest] = useState(0);

  const [buy, setbuy] = useState(true);

  const { ticker, name } = route.params.x;

  const [slables, setslables] = useState([""]);
  const [prices, setprices] = useState([0]);
  const [price, setprice] = useState(1);
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
      }).catch(err =>{
        console.log(err);
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

  const buystock = () => {
    const target = {};
    target["portfolio." + ticker] = sliderb;
    target["balance"] = balance - sliderb * price;
    account["history"].push({
      action: "buy",
      ticker: ticker,
      amount: sliderb,
      price: price,
      cost: "-" + sliderb * price,
    });
    target["history"] = account["history"];

    db.collection("users")
      .doc(auth().currentUser.uid)
      .update(target)
      .then(() => {
        update_data();
        Alert.alert(
          "Bought " +
            sliderb.toFixed(2) +
            " shares of " +
            ticker +
            " at $" +
            price
        );
      });
  };

  const sellstock = () => {
    const target = {};
    target["portfolio." + ticker] = owned - sliders;
    target["balance"] = balance + sliders * price;
    account["history"].push({
      action: "sell",
      ticker: ticker,
      amount: sliders,
      price: price,
      cost: "+" + sliderb * price,
    });
    target["history"] = account["history"];
    db.collection("users")
      .doc(auth().currentUser.uid)
      .update(target)
      .then(() => {
        console.log("updated");
        update_data();
        Alert.alert(
          "Sold " +
            sliders.toFixed(2) +
            " shares of " +
            ticker +
            " at $" +
            price
        );
      });
  };

  const update_data = () => {
    db.collection("users")
      .doc(auth().currentUser.uid)
      .get()
      .then((doc) => {
        const data = doc.data();
        setaccount(data);
        setbalance(data["balance"]);
        setowned(ticker in data["portfolio"] ? data["portfolio"][ticker] : 0);
      });
      
  };

  const handleChange =() =>{
    setfavourite(prevState => !prevState);
    Alert.alert(
      `${ticker} ${!favourite ? 'added to' : 'removed from'} Watchlist`
    )
   
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
    get_intraday(selected);
    get_quote();
    get_news();
    update_data();
    check_favourite();
  }, []);

  const Gradient = () => (
    <Defs key={"gradient"}>
      <LinearGradient id={"gradient"} x1={"0%"} y1={"0%"} x2={"0%"} y2={"100%"}>
        <Stop offset={"0%"} stopColor={"rgb(134, 65, 244)"} stopOpacity={0.6} />
        <Stop
          offset={"2%"}
          stopColor={"rgb(241, 241, 241)"}
          stopOpacity={1}
        />
      </LinearGradient>
    </Defs>
  );
  return loading ? (
    <ActivityIndicator
      size={100}
      color="#0000ff"
      style={{ marginTop: Dimensions.get("window").height * 0.5 }}
    />
  ) : (
    <SafeAreaView>
      <ScrollView style ={{backgroundColor: "white"}}>
        <Text style = {{fontFamily: "Arial", fontWeight : "bold", fontSize: 15, margin: 10}}>{ticker + " - " + name}</Text>

        <View style={{ height: 300, flexDirection : 'row'}} >
          <YAxis
            data={prices}
            contentInset={{ top: 30, bottom: 30 }}
            numberOfTicks={10}
            svg={{
                fill: 'grey',
                fontSize: 10,
            }}
          />
          <LineChart
            style={{ height: 300, flex: 1, marginLeft: 16}}
            data={prices}
            contentInset={{ top: 30, bottom: 30 }}
            svg={{
              fill: "url(#gradient)",
              stroke: "rgb(117, 31, 255)",
              strokeWidth: 3,
            }}
            showGrid={ true }
          >
            <Gradient />
            <Grid/>
          </LineChart>  
          
        </View>

        <View style={{ alignItems: "stretch", marginTop: 30, display: 'flex', flexDirection: 'row'}}>
          
          <View style= {{ alignItems: "center", alignSelf:'auto', flexGrow: 1, margin :10, backgroundColor : "white"}}>
          
            <Text style = {{marginBottom: 15, fontWeight : "bold"}}> {"Select an Interval" }</Text>
        
            <View style ={selected == 1 ? styles.activeIntervalBackground : {}}>
              <TouchableOpacity onPress={() => change_select(1)}>
                <Text style={selected == 1 ? styles.intervalActive : styles.intervalInactive} >
                  1 min
                </Text>
              </TouchableOpacity>
            </View>
          
            <View style ={selected == 5 ? styles.activeIntervalBackground : {}}>
              <TouchableOpacity onPress={() => change_select(5)}>
                <Text style={selected == 5 ? styles.intervalActive : styles.intervalInactive}>
                  5 min
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style ={selected == 15 ? styles.activeIntervalBackground : {}}>
              <TouchableOpacity onPress={() => change_select(15)}>
                <Text style={selected == 15 ? styles.intervalActive : styles.intervalInactive}>
                  15 min
                </Text>
              </TouchableOpacity>
            </View>

            <View style ={selected == 30 ? styles.activeIntervalBackground : {}}>
              <TouchableOpacity onPress={() => change_select(30)}>
                <Text style={selected == 30 ? styles.intervalActive : styles.intervalInactive}>
                  30 min
                </Text>
              </TouchableOpacity>
            </View>

            <View style ={selected == 60 ? styles.activeIntervalBackground : {}}>
              <TouchableOpacity onPress={() => change_select(60)}>
                <Text style={selected == 60 ? styles.intervalActive : styles.intervalInactive}>
                  60 min
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style = {{display: "flex", alignItems:'center', justifyContent: "center",flexGrow: 1, margin: 10, backgroundColor: "#edeef2", borderRadius: 15}}>
            <Text style ={{fontFamily: "Arial", fontSize: 16, fontWeight: "normal" }}>{"Price - " + price}</Text>
            <Text style ={{fontFamily: "Arial", fontSize: 16, fontWeight: "normal"}} >{"High - " + high}</Text>
            <Text style ={{fontFamily: "Arial", fontSize: 16, fontWeight: "normal"}} >{"Low - " + low}</Text>
            <Text style ={{fontFamily: "Arial", fontSize: 16, fontWeight: "normal"}} >{"Volume - " + volume}</Text>
            <Text
              style= {change.includes("-") ? { color: "red",fontFamily: "Arial", fontSize: 16, fontWeight: "normal" } : {color: "green",fontFamily: "Arial", fontSize: 16, fontWeight: "normal"}}
            >
              {change}
            </Text>
          </View>
        </View>
    

        <View style={{ alignItems: "center" }}>
      
          <View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity>
                <Text
                  style={buy ? { color: "green", margin: 20 } : { margin: 20 }}
                  onPress={() => {
                    setbuy(true);
                  }}
                >
                  Buy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={buy ? { margin: 20 } : { margin: 20, color: "red" }}
                  onPress={() => {
                    setbuy(false);
                  }}
                >
                  Sell
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ margin: 20 }}>
            {buy ? (
              <View>
                <Text>Balance: ${balance}</Text>
                <Slider
                  style={{ width: 200, height: 40 }}
                  minimumValue={0}
                  maximumValue={balance / price}
                  onValueChange={(val) => {
                    setsliderb(val);
                  }}
                />
                <Text>Shares: {sliderb.toFixed(2)}</Text>
                <Text>Amount: ${(sliderb * price).toFixed(2)}</Text>
                
                <View style ={{
                  backgroundColor: "green",
                  width: 40,
                  padding: 5,
                  borderRadius: 5
                }}>
                  <TouchableOpacity
                    onPress={() => {
                      buystock();
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold"
                      }}
                    >
                      BUY
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <Text>Amount: {owned}</Text>
                <Slider
                  style={{ width: 200, height: 40 }}
                  minimumValue={0}
                  maximumValue={owned}
                  onValueChange={(val) => {
                    setsliders(val);
                  }}
                />
                <Text>Shares: {sliders.toFixed(2)}</Text>
                <Text>Amount: ${(sliders * price).toFixed(2)}</Text>
                
                <View style={{
                  backgroundColor: "red",
                  width: 50,
                  padding: 5,
                  borderRadius: 5
                }}>
                  <TouchableOpacity
                    onPress={() => {
                      sellstock();
                    }}
                  >
                    <Text
                      style={{ color: "white", fontWeight: 'bold'}}
                    >
                      SELL
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>

        <View style = {{alignItems: "center", display: "flex", flexDirection: "row" ,alignContent:"center", justifyContent:"center",}}>
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

        <Text style={{ marginLeft: 20, marginTop: 30 }}>Latest News</Text>

        { <View>
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
        </View> }
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  intervalActive: {
    fontWeight : "bold",
    fontFamily: "Arial", 
    fontSize: 20,
    color: '#000',
    
  },
  intervalInactive: {
    fontWeight : "normal",
    fontFamily: "Arial", 
    fontSize: 15
  },
  activeIntervalBackground: {
    paddingVertical :5,
    paddingHorizontal: 15,
    color: '#000',
    backgroundColor: '#edeef2',
    borderRadius: 10,
  },
  
})

export default Stock;
