import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import * as SecureStorage from 'expo-secure-store';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
//tvorba cache
const tokenCache = {
  async getToken(key: string){
    try {
      return SecureStorage.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },

  async saveToken (key: string, value: string){
    try {
      return SecureStorage.setItemAsync(key, value);
    } catch (error) {
      return;
    }
  }
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

//fonts
export default function RootLayout() {
  const [loaded, error] = useFonts({
    Montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
    MontserratMedium: require("../assets/fonts/Montserrat-Medium.ttf"),
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
    <RootLayoutNav />
  </ClerkProvider> 
  )
}

function RootLayoutNav() {
  const router = useRouter();

  const { isLoaded, isSignedIn } = useAuth();

  useEffect(()=>{
    if(isLoaded && !isSignedIn){
      router.push('/(modals)/login');
    }
  }, [isLoaded]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/login"
        options={{
          presentation: "modal",
          title: "Log in or Sign up",
          headerTitleStyle: {
            fontFamily: "MontserratSemiBold",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="listing/[id]"
        options={{
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="(modals)/booking"
        options={{
          presentation: "transparentModal",
          animation:'fade' ,
          title: "Booking",
          headerTitleStyle: {
            fontFamily: "MontserratSemiBold",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}