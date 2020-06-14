import React from "react";
import { View, Text, Dimensions } from "react-native";

import { LineChart } from "react-native-chart-kit";

export default Chart = ({ slables, prices }) => {
  return (
    <LineChart
      data={{
        labels: slables,
        datasets: [
          {
            data: prices,
          },
        ],
      }}
      width={Dimensions.get("window").width * 0.95} // from react-native
      height={320}
      chartConfig={{
        backgroundGradientFrom: "#ebebeb",
        backgroundGradientTo: "#ffffff",
        fillShadowGradientOpacity: 0.1,
        decimalPlaces: 2,
        color: () => `rgba(5, 134, 255, ${50})`,
        labelColor: () => `rgba(0, 0, 0, ${100})`,
        strokeWidth: 2,
        style: {
          borderRadius: 30,
          paddingRight: 3,
          overflow: "visible"
        },
        propsForDots: {
          r: "1",
          strokeWidth: "0",
          stroke: "#0586ff",
          strokeOpacity: 1,
        },
        propsForLabels: {
          fontFamily: "Verdana",
          lengthAdjust: true,
        },
      }}
      style={{
        borderRadius: 13,
        alignContent: "center",
        overflow: "visible"
      }}
      withInnerLines={false}
      segments={5}
    />
  );
};
