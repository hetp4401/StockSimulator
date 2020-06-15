import React, { useCallback } from "react";
import {
  Alert,
  Button,
  Linking,
  StyleSheet,
  View,
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
      <Text style={{ marginLeft: 7, marginTop: 4 }}>{x.snippet}</Text>
      <Image
        source={{
          uri: x.img,
        }}
        style={{
          height: 200,
          resizeMode: "stretch",
          margin: 5,
          borderRadius: 4,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 12,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "white",
    borderRadius: 15,
  },
});

export default ArticleLink;
