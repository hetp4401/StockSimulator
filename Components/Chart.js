import React from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default Chart = ({ prices }) => {
  return (
    <LineChart
      data={{
        datasets: [
          {
            data: prices,
          },
        ],
      }}
      width={Dimensions.get("window").width * 0.95} 
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
        },
        propsForLabels: {
          fontFamily: "Verdana",
          lengthAdjust: true,
        },
      }}
      style={{
        borderRadius: 13,
        alignContent: "center",
      }}
      withInnerLines={false}
      segments={5}
      withDots={false}
      axis
    />
  );
};
