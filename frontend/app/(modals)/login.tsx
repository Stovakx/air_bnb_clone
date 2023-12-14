import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser'
import { defaultStyles } from '../../constants/styles';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter, Redirect } from 'expo-router';



enum Strategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
  Facebook = 'oauth_facebook',
}
/**
 * Renders a login page with various authentication options.
 * Uses the `useWarmUpBrowser` hook to warm up the browser and the `useOAuth` hook to handle OAuth authentication with different strategies like Google, Apple, and Facebook.
 * 
 * 
 * when i try to log in, it will give me unmatched route. Problem is on Clerk/Google side. Maybe try to do auth myself? 
 * 
 * @returns {JSX.Element} The rendered login page.
 */
const Page = () => {
  useWarmUpBrowser();
  const router = useRouter();

  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });
  const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();
      console.log('OAuth response', createdSessionId);
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        <Redirect href={'/(tabs)/'}/>;
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput autoCapitalize='none' placeholder='Email' style={[defaultStyles.inputField, {marginBottom:30}]} />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.separateView}>
        <View style={{borderBottomColor:"#000", flex:1, borderBottomWidth:StyleSheet.hairlineWidth,}} />
        <Text style={styles.seperator}>or</Text>
        <View style={{borderBottomColor:"#000", flex:1, borderBottomWidth:StyleSheet.hairlineWidth,}} />
      </View>

      <View style={{ gap: 23 }}>
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name="call-outline" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Apple)}>
          <Ionicons name="logo-apple" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
          <Ionicons name="logo-google" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Facebook)}>
          <Ionicons name="logo-facebook" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor:"#FFF",
    padding:26,
  },
  separateView:{
    flexDirection:"row",
    marginVertical:30,
    gap:10,
    alignItems:"center",
  },
  seperator:{
    fontFamily:"MontserratSemiBold",
    color: Colors.grey,
  },
  btnOutlineText:{
    color:'#000',
    fontSize: 16,
    fontFamily:"MontserratSemiBold",
  },
  btnOutline:{
    backgroundColor:"#FFF",
    borderWidth:1,
    borderColor:Colors.grey,
    height:54,
    borderRadius:8,
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row",
    paddingHorizontal:10,
  }
})
export default Page