import React from 'react'
import { View, Text } from 'react-native'
import WatchList from "../../Components/WatchList"
import Stock from "../../Components/Stock"

import { createStackNavigator } from "@react-navigation/stack";
const watchListStack = createStackNavigator();

const WatchListScreen = () => {
    return (
        <watchListStack.Navigator
            screenOptions={{
                headerShown: true,
            }}
        >
            <watchListStack.Screen name="Watchlist" component={WatchList} />
            <watchListStack.Screen name="stock" component={Stock} />
        </watchListStack.Navigator>
    )
}

export default WatchListScreen;
