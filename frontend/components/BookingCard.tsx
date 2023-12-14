//TODO: předělat na více komponentů aby byl kód přehlednější?

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
  onDateChange,
  guestsGropus,
  setGroups,
  groups,
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
              /* nastavit setSearch nebo něco takového, aby to vyhledávalo v places.ts jména destinací a vyfiltrovalo to dané desinace */
            />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.placesContainer}
          >
            {places.map((place, index) => (
              <TouchableOpacity
                onPress={() => setSelectedPlaces(place)}
                key={index}
              >
                <Image
                  source={place.img}
                  style={
                    selectedPlaces == place
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
        //změnit stylizaci vybraných dnů
        <CalendarPicker
          selectedDayColor={Colors.primary}
          selectedDayTextColor={"#fff"}
          startFromMonday={true}
          allowRangeSelection={true}
          onDateChange={onDateChange}
        />
      ) : (
        <>
          {guestsGropus.map((group, index) => (
            <View
              style={[
                styles.guestItem,
                index + 1 < guestsGropus.length ? styles.itemBorder : null,
              ]}
              key={index}
            >
              <View>
                <Text
                  style={{ fontFamily: "MontserratSemiBold", fontSize: 14 }}
                >
                  {group.name}
                </Text>
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: 14,
                    color: Colors.grey,
                  }}
                >
                  {group.text}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    const newGroups = [...guestsGropus];
                    newGroups[index].count =
                      newGroups[index].count > 0
                        ? newGroups[index].count - 1
                        : 0;
                    setGroups(newGroups);
                  }}
                >
                  <Ionicons
                    name="remove-circle-outline"
                    size={26}
                    color={
                      guestsGropus[index].count > 0 ? Colors.grey : "#cdcdcd"
                    }
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: 16,
                    minWidth: 18,
                    textAlign: "center",
                  }}
                >
                  {groups[index].count}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    const newGroups = [...guestsGropus];
                    newGroups[index].count++;
                    setGroups(newGroups);
                  }}
                >
                  <Ionicons
                    name="add-circle-outline"
                    size={26}
                    color={Colors.grey}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </>
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
