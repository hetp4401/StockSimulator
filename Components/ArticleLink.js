import React, { useCallback } from "react";
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ArticleLink = ({ x }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(x.link);

    if (supported) {
      await Linking.openURL(x.link);
    } else {
      Alert.alert(`Don't know how to open this URL: ${x.link}`);
    }
  }, [x.link]);

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image
        source={{
          uri: x.img,
        }}
        style={{
          height: 200,
          margin: 5,
          borderRadius: 8,
        }}
      />
      <Text style={{ marginLeft: 7, marginTop: 4, fontFamily: "Arial" }}>
        {x.snippet}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 4,
    marginTop: 12,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "white",
    borderColor: "#edeef2",
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: "space-between",
  },
});

export default ArticleLink;
