import React, { useState } from "react";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from "react-native-reanimated";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { Text, StyleSheet, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
//@ts-ignore
import CalendarPicker from "react-native-calendar-picker";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export const CardBody = ({
  openCard,
  setSelectedPlaces,
  selectedPlaces,
  places,
  onDateChange
}: any) => {


  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.cardBody}>
      {openCard == 0 ? (
        <>
          <View style={styles.searchSection}>
            <Ionicons
              name="ios-search"
              size={20}
              color={"#000"}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Search destinations"
              placeholderTextColor={Colors.grey}
            />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.placesContainer}
          >
            {places.map((place, index) => (
              <TouchableOpacity
                onPress={() => setSelectedPlaces(index)}
                key={index}
              >
                <Image
                  source={place.img}
                  style={
                    selectedPlaces == index
                      ? styles.placeSelected
                      : styles.place
                  }
                />
                <Text style={{ fontFamily: "Montserrat", paddingTop: 6 }}>
                  {place.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      ) : openCard == 1 ? (
        /* napsat kód pro vybrání startovného datumu a konečného, stylizace dní ve výběru */
        <CalendarPicker
          selectedDayColor={Colors.primary}
          selectedDayTextColor={"#fff"}
          startFromMonday={true}
          allowRangeSelection={true}
          onDateChange={onDateChange}
        />
      ) : (
        <View key={openCard} style={styles.searchSection}>
          <Text>Open card is 2</Text>
        </View>
      )}
    </Animated.View>
  );
};

export const CardHeader = ({ title, style }: any) => {
  return <Text style={[styles.cardHeader, style]}>{title}</Text>;
};

const BookingCard = ({ firstText, secondText, onPress, style }: any) => {
  return (
    <AnimatedTouchableOpacity
      style={[styles.cardPreview, style]}
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
      onPress={onPress}
    >
      <Text style={styles.previewText}>{firstText}</Text>
      <Text style={styles.previewdData}>{secondText}</Text>
    </AnimatedTouchableOpacity>
  );
};

//pevnou výšku u cardHeader a cardPreview?
const styles = StyleSheet.create({
  previewText: {
    fontFamily: "MontserratSemiBold",
    fontSize: 14,
    color: Colors.grey,
  },
  previewdData: {
    fontFamily: "MontserratSemiBold",
    fontSize: 14,
    color: Colors.dark,
  },
  cardHeader: {
    fontFamily: "MontserratBold",
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  guestItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.grey,
  },
  searchSection: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    marginBottom: 16,
  },
  searchIcon: {
    padding: 10,
  },
  inputField: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  placesContainer: {
    flexDirection: "row",
    gap: 25,
  },
  place: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  placeSelected: {
    borderColor: Colors.grey,
    borderWidth: 2,
    borderRadius: 10,
    width: 100,
    height: 100,
  },
});

export default BookingCard;
