import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView
} from "react-native";


const WatchList = () => {
    

    return (
        <SafeAreaView>
            <ScrollView>
                <View style = {{flexDirection: "row", justifyContent: "center"}}>
                    <Text>
                        Watchlist
                    </Text>
                    <Text>
                        need to add: 
                            favourites section, 
                            
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
        
    )
}



export default WatchList; 