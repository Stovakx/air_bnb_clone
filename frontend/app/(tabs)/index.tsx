import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Stack } from 'expo-router'
import ExploreHeader from '../../components/ExploreHeader'
import listingData from '../../assets/data/air-bnb-listings.json';
import listingDataGeo from '../../assets/data/airbnb-listings.geo.json'
import ListingMap from '../../components/ListingMap';
import ListingBottomSheets from '../../components/ListingBottomSheets'


const Page = () => {
  const [category, setCategory] = useState('Trending')
  const items = useMemo(()=> listingData as any, []);
  const itemsGeo = useMemo(()=> listingDataGeo as any, []);
  const onDataChanged = (category:string)=>{
    setCategory(category);
  }

  return (
    <View style={{flex:1, marginTop:80}}>
      <Stack.Screen options={{
        header: ()=> <ExploreHeader onCategoryChanged={onDataChanged}/>,

      }}
      />
     <ListingMap listings={itemsGeo}/>
     <ListingBottomSheets listings={items} category={category}/>
    </View>
  )
}

export default Page
