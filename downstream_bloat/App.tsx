import * as encoding from "text-encoding";
import * as BigInteger from "big-integer";
import { SafeAreaView } from "react-native";
import { GlobalStyles, Theme } from "./models/theme";
import Entry from "./views/Entry";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { GrpcClient, GrpcMetadata } from "@mitch528/react-native-grpc";
import { RegisterRequest, RegisterResponse } from "./models/proto/auth";

Object.assign("global", {
  TextEncoder: encoding.TextEncoder,
  TextDecoder: encoding.TextDecoder,
  BigInt: BigInteger,
});

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
  GrpcClient.setHost("localhost:50051");
  const data: Uint8Array = RegisterRequest.toBinary(
    RegisterRequest.create({
      email: "test@test.com",
      password: "password",
      displayName: "Test",
    })
  );

  useEffect(() => {
    async function doRequest() {
      console.log("Sending request");
      const { response } = await GrpcClient.unaryCall(
        "cutchin_cash.auth.AuthService/Register",
        data,
        {} as GrpcMetadata
      );
      console.log("Received response");
      const registerResponse: RegisterResponse =
        RegisterResponse.fromBinary(response);
      console.log(registerResponse);
    }

    doRequest();
  }, []);

  return (
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
  );
}
