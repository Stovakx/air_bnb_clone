import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

const BookingHeader = () => {
  const [active, setActive] = useState(0);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setActive(0)}>
        <Text
          style={[
            styles.text,
            {
              color: active === 0 ? "#000" : Colors.grey,
              textDecorationLine: active === 0 ? "underline" : "none",
            },
          ]}
        >
          Stays{" "}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActive(1)}>
        <Text
          style={[
            styles.text,
            {
              color: active === 1 ? "#000" : Colors.grey,
              textDecorationLine: active === 1 ? "underline" : "none",
            },
          ]}
        >
          Experience{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  text: {
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
  },
});

export default BookingHeader;
