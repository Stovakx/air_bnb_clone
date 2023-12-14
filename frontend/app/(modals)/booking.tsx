import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import Animated, { SlideInDown } from "react-native-reanimated";
import { defaultStyles } from "../../constants/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BookingCard, {
  CardBody,
  CardHeader,
} from "../../components/BookingCard";
import { places } from "../../assets/data/places";

const Page = () => {
  const router = useRouter();
  const [openCard, setOpenCard] = useState(0);
  const [selectedPlaces, setSelectedPlaces] = useState(0);
  const [selectedStartDate, setSelectedStartDate] = useState("DD/MM/YYYY");
  const [selectedEndDate, setSelectedEndDate] = useState("DD/MM/YYYY");

  const clearAll = () => {
    setOpenCard(0);
    setSelectedPlaces(0);
  };
  //TODO: code works fine, but i think it will be here easier way for this. 
  const onDateChange = (date:Date, type:string) => {
    const newDate = JSON.stringify(date);
    const newDate1 = newDate.substring(1, newDate.length-1);
    const dates = newDate1.split('T');
    const date1 = dates[0].split('-');
    const day = date1[2];
    const month = date1[1];
    const year = date1[0];
    console.log(day+"/"+month+"/"+year)

    if (type === "END_DATE") {
      if (day == undefined) {
        setSelectedEndDate("DD/MM/YYYY");
      } else {
        setSelectedEndDate(day+"/"+month+"/"+year);
      }
    } else {
      setSelectedStartDate(day+"/"+month+"/"+year);
      setSelectedEndDate('')
    }
  };

  return (
    <BlurView style={styles.container} intensity={70} tint="dark">
      <View>
        <Text>{selectedStartDate}</Text>
      <Text>{selectedEndDate}</Text>
      </View>
      {/* Where */}
      <View style={styles.card}>
        {openCard != 0 && (
          <BookingCard
            firstText={"Where"}
            secondText={"setOpenCard 0"}
            setOpenCard={setOpenCard}
            onPress={() => setOpenCard(0)}
          />
        )}
        {openCard == 0 && (
          <>
            <CardHeader title={"Where to?"} />
            <CardBody
              openCard={openCard}
              places={places}
              setSelectedPlaces={setSelectedPlaces}
              selectedPlaces={selectedPlaces}
            />
          </>
        )}
      </View>
      {/* When */}
      <View style={styles.card}>
        {openCard != 1 && (
          <BookingCard
            firstText={"When"}
            secondText={"setOpenCard 1"}
            setOpenCard={setOpenCard}
            onPress={() => setOpenCard(1)}
          />
        )}
        {openCard == 1 && (
          <>
            <CardHeader title={"When to?"} />
            <CardBody openCard={openCard} onDateChange={onDateChange} />
          </>
        )}
      </View>

      <View style={styles.card}>
        {openCard != 2 && (
          <BookingCard
            firstText={"Guests"}
            secondText={"2"}
            setOpenCard={setOpenCard}
            onPress={() => setOpenCard(2)}
          />
        )}
        {openCard == 2 && (
          <>
            <CardHeader title={"How many people?"} />
            <CardBody openCard={openCard} />
          </>
        )}
      </View>

      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View style={styles.footerView}>
          <TouchableOpacity
            onPress={clearAll}
            style={{ justifyContent: "center" }}
          >
            <Text style={styles.clearAllText}> Clear all</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[defaultStyles.btn, { paddingLeft: 50, paddingRight: 20 }]}
          >
            <Ionicons
              name="search-outline"
              size={24}
              color={"#FFF"}
              style={defaultStyles.btnIcon}
            />
            <Text style={defaultStyles.btnText}>Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
     
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  footerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clearAllText: {
    fontSize: 18,
    fontFamily: "MontserratSemiBold",
    textDecorationLine: "underline",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
});
export default Page;
