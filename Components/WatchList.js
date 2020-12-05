import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextComponent,
  ActivityIndicator,
  Dimensions,
} from "react-native";

import { auth, db } from "../firebase";

const WatchList = ({ navigation }) => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setloading] = useState(true);

  const getUserFavourites = () => {
    db.collection("users")
      .doc(auth().currentUser.uid)
      .get()
      .then((doc) => {
        setFavourites(doc.data().watchlist);
        setloading(false);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      getUserFavourites();
    }, 1000);
  });

  return loading ? (
    <ActivityIndicator
      size={100}
      color="#0000ff"
      style={{ marginTop: Dimensions.get("window").height * 0.5 }}
    />
  ) : (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView>
        {favourites.map((x, i) => (
          <TouchableOpacity
            style={styles.favouritesCard}
            key={i}
            onPress={() => navigation.navigate("stock", { x })}
          >
            <Text
              style={{ fontFamily: "Arial", fontSize: 20, fontWeight: "bold" }}
            >
              {x.ticker}
            </Text>
            <Text style={{ fontFamily: "Arial", fontSize: 15 }}>{x.name}</Text>
            <Text style={{ fontFamily: "Arial", fontSize: 15 }}>
              Price: {x.price}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  favouritesCard: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 30,
    backgroundColor: "#edeef2",
  },
});

export default WatchList;
