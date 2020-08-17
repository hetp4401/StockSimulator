import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView
} from "react-native";

import {auth, db} from "../firebase";
import { set } from "react-native-reanimated";


const WatchList = ({navigation}) => {
    const [favourites,setFavourites] = useState([]);
    

    const getUserFavourites = ()=>{

       db.collection("users").doc(auth().currentUser.uid).get()
       .then(doc =>{
           setFavourites(doc.data().watchlist);
       })

    }

    useEffect(()=>{
        setTimeout(() => {
            getUserFavourites();
        },1000);
    
    });

    return (
        <SafeAreaView>
            <ScrollView>
                {favourites.map((x, i) => ( 
                   <TouchableOpacity 
                    style = {styles.favouritesCard}
                    key = {i}
                    onPress={() => navigation.navigate("stock", { x })}
                    >
                        <Text>
                            {x.ticker}
                        </Text>
                        <Text>
                            {x.name}
                        </Text>
                        <Text>
                            {x.volume}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    favouritesCard: {
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
        paddingHorizontal: 20,
        paddingVertical: 40,
        backgroundColor: "white",
        borderRadius: 30,
    },
  });



export default WatchList; 