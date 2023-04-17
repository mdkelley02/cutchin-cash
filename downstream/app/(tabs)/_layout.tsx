import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Routes } from "../../constants/Routes";
import { Sizes, View, iconProps, useColor } from "../../components/Themed";
import { ProfileViewType } from "../../store";
import { useAppState } from "../../hooks/useAppState";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  color: string;
}) {
  return (
    <FontAwesome5
      style={{ marginBottom: -3 }}
      {...iconProps(props.name, { size: Sizes.sm })}
      color={props.color}
    />
  );
}

const TABS = [
  { href: "/Search", icon: "search" },
  { href: "/Profile", icon: "user-circle" },
] as const;

export default function TabLayout() {
  const color = useColor();
  const { dispatchProfileView, authState } = useAppState();

  return (
    <Tabs
      initialRouteName={Routes.Dashboard}
      screenOptions={{
        headerStyle: {
          backgroundColor: color.background,
        },
        tabBarStyle: {
          backgroundColor: color.background,
        },
        tabBarActiveTintColor: color.text,
      }}
    >
      <Tabs.Screen
        name={Routes.Dashboard}
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                columnGap: Sizes.sm,
              }}
            >
              {TABS.map(({ href, icon }, key) => (
                <Link href={href} asChild key={key}>
                  <Pressable
                    onPress={() => {
                      if (authState.user == null) return;

                      dispatchProfileView({
                        type: ProfileViewType.SetProfileUserId,
                        payload: authState.user.userId,
                      });
                    }}
                  >
                    {({ pressed }) => (
                      <FontAwesome
                        name={icon}
                        size={Sizes.xl}
                        color={color.text}
                        style={{
                          marginRight: 15,
                          opacity: pressed ? 0.5 : 1,
                        }}
                      />
                    )}
                  </Pressable>
                </Link>
              ))}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name={Routes.KeyPad}
        options={{
          title: "Pay",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="money-check" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
