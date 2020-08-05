import React from 'react'
import { View, Text } from 'react-native'
import WatchList from "../../Components/WatchList"

import { createStackNavigator } from "@react-navigation/stack";
const watchListStack = createStackNavigator();

const WatchListScreen = () => {
    return (
        <watchListStack.Navigator
            screenOptions={{
                headerShown: true,
            }}
        >
            <watchListStack.Screen name="watchlist" component={WatchList} />
        </watchListStack.Navigator>
    )
}

export default WatchListScreen
