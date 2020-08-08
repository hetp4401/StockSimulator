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
                <TouchableOpacity style = {styles.favouritesCard}>
                    <Text>
                        Testing
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.favouritesCard}>
                    <Text>
                        Testing
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.favouritesCard}>
                    <Text>
                        Testing
                    </Text>
                </TouchableOpacity>
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