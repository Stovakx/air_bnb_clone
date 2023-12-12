import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '../../components/ExploreHeader'
import Listing from '../../components/Listing'
import listingData from '../../assets/data/air-bnb-listings.json';


const Page = () => {
  const [category, setCategory] = useState('Trending')
  const items = useMemo(()=> listingData as any, []);
  const onDataChanged = (category:string)=>{
    console.log('data changed', category);
    setCategory(category);
  }

  return (
    <View style={{flex:1, marginTop:130}}>
      <Stack.Screen options={{
        header: ()=> <ExploreHeader onCategoryChanged={onDataChanged}/>,

      }}
      />
      <Listing listings={items} category={category}/>
    </View>
  )
}

export default Page
