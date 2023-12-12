import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '../../components/ExploreHeader'
import Listing from '../../components/Listing'
import listingData from '../../assets/data/air-bnb-listings.json';
import listingDataGeo from '../../assets/data/airbnb-listings.geo.json'
import ListingMap from '../../components/ListingMap';


const Page = () => {
  const [category, setCategory] = useState('Trending')
  const items = useMemo(()=> listingData as any, []);
  const itemsGeo = useMemo(()=> listingDataGeo as any, []);
  const onDataChanged = (category:string)=>{
    setCategory(category);
  }

  return (
    <View style={{flex:1, marginTop:130}}>
      <Stack.Screen options={{
        header: ()=> <ExploreHeader onCategoryChanged={onDataChanged}/>,

      }}
      />
      {/* <Listing listings={items} category={category}/> */}
     <ListingMap listings={listingDataGeo}/>
    </View>
  )
}

export default Page
