import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { AppProvider } from "../store/AppStateContext";
import { useColor } from "../components/Themed";
import { Routes, Segments } from "../constants/Routes";
export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const color = useColor();

  return (
    <ThemeProvider
      value={useColorScheme() === "dark" ? DarkTheme : DefaultTheme}
    >
      <AppProvider>
        <Stack
          initialRouteName={`(auth)/Login`}
          screenOptions={{
            headerStyle: {
              backgroundColor: color.background,
            },
            headerTintColor: color.text,
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={Routes.Login}
            options={{
              headerTitle: "Login",
            }}
          />
          <Stack.Screen
            name={Routes.Register}
            options={{
              headerTitle: "Register",
            }}
          />
          <Stack.Screen
            name={Routes.ExecutePayModal}
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name={Routes.Search}
            options={{
              headerShown: false,
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name={Routes.Profile}
            options={{
              presentation: "card",
            }}
          />
          <Stack.Screen
            name={Routes.TransactionOptions}
            options={{
              presentation: "card",
              headerTitle: "Transaction Options",
            }}
          />
        </Stack>
      </AppProvider>
    </ThemeProvider>
  );
}
