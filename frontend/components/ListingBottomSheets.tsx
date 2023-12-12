import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { listing } from '../interface/listing';
import BottomSheet from '@gorhom/bottom-sheet';
import Listing from './Listing';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    listings: listing[];
    category: string;
}
const ListingBottomSheets = ({listings, category}: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [refresh, setrefresh] = useState(0);
    const snapPoints = useMemo(()=> ['10%', '100%'], []);
    
    const showMap = ()=>{
        bottomSheetRef.current?.collapse();
        setrefresh(refresh + 1);
    };


  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints} handleIndicatorStyle={{backgroundColor: Colors.grey}} style={styles.sheetContainer}>
        <View style={{flex:1}}>
            <Listing listings={listings} category={category} refresh={refresh}/>
            <View style={styles.absoluteBtn}>
                <TouchableOpacity onPress={showMap} style={styles.btn}>
                    <Ionicons name='map' size={28} color={"#FFF"}/>
                </TouchableOpacity>
            </View>
        </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
    absoluteBtn:{
       position:"absolute",
       bottom:30, 
       width:"100%",
       alignItems:"center"
    },
    btn:{
        backgroundColor: Colors.dark,
        height:60,
        padding:16,
        borderRadius:30,
        flex:1,
        alignItems:"center",
    },
    sheetContainer:{
        backgroundColor:"#FFF",
        elevation: 4,
        shadowColor:"#000",
        borderRadius:10,
        shadowOpacity:.3,
        shadowRadius:4,
        shadowOffset:{
            width:1,
            height:1,
        },
    }
})

export default ListingBottomSheets