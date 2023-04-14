import { SafeAreaView, View } from "react-native";
import { GlobalStyles, Theme } from "./models/theme";
import Entry from "./views/Entry";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { GrpcProvider } from "./contexts/GrpcContext";

const Stack = createNativeStackNavigator();

function CutchinCashStack() {
  // https://reactnavigation.org/docs/themes/
  return (
    <Stack.Navigator>
      <Stack.Screen name="Entry" component={Entry} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <GrpcProvider>
      <SafeAreaView style={GlobalStyles.container}>
        <NavigationContainer
          theme={{
            dark: true,
            colors: {
              primary: "#314468",
              background: "#121723",
              card: "#182336",
              text: "#fefeff",
              border: "#314468",
              notification: "rgb(255, 69, 58)",
            },
          }}
        >
          <CutchinCashStack />
        </NavigationContainer>
      </SafeAreaView>
    </GrpcProvider>
  );
}
