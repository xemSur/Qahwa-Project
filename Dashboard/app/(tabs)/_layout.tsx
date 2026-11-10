import React from "react";
import { Tabs } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

const icons: Record<string, string> = {
  index: "📊",
  providers: "👥",
  bookings: "📋",
  packages: "🎁",
  settings: "⚙️",
};

const labels: Record<string, string> = {
  index: "الرئيسية",
  providers: "القهوجيين",
  bookings: "الحجوزات",
  packages: "الباقات",
  settings: "الإعدادات",
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>
            {icons[route.name] || "📄"}
          </Text>
        ),
        tabBarActiveTintColor: "#d97706",
        tabBarInactiveTintColor: "#57534e",
        tabBarStyle: {
          backgroundColor: "#1c1917",
          borderTopColor: "#292524",
          borderTopWidth: 1,
          paddingTop: 4,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginBottom: 4,
        },
        tabBarLabel: labels[route.name] || route.name,
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="providers" />
      <Tabs.Screen name="bookings" />
      <Tabs.Screen name="packages" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
