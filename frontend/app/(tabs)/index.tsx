import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '../../components/ExploreHeader'
import Listing from '../../components/Listing'


const Page = () => {
  const [category, setCategory] = useState('Trending')
  const onDataChanged = (category:string)=>{
    console.log('data changed', category);
    setCategory(category);
  }

  return (
    <View style={{flex:1, marginTop:145}}>
      <Stack.Screen options={{
        header: ()=> <ExploreHeader onCategoryChanged={onDataChanged}/>,

      }}
      />
      <Listing listings={[]} category={category}/>
    </View>
  )
}

export default Page
