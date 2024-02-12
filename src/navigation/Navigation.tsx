import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Text } from "react-native";
import { History } from "../screens/History";
import { TaskEditor } from "../screens/TaskEditor";
import { TasksList } from "../screens/TasksList";
import { Settings } from "../screens/Settings";
import { EScreens } from "../constants/common";
import TodoListIcon from "../../assets/icons/todoList.svg";
import HistoryIcon from "../../assets/icons/undo.svg";
import SettingsIcon from "../../assets/icons/settings.svg";

type RootStackParamList = {
  [EScreens.TaskEditor]: {};
  [EScreens.Tabs]: {};
};

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="List"
      component={TasksList}
      options={{
        tabBarIcon: (state) => (
          <TodoListIcon
            width={state.size}
            height={state.size}
            color={state.color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="History"
      component={History}
      options={{
        tabBarIcon: (state) => (
          <HistoryIcon
            width={state.size}
            height={state.size}
            color={state.color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={Settings}
      options={{
        tabBarIcon: (state) => {
          return (
            <SettingsIcon
              width={state.size}
              height={state.size}
              color={state.color}
            />
          );
        },
      }}
    />
  </Tab.Navigator>
);

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const MainNavigation = () => (
  <RootStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <RootStack.Group>
      <RootStack.Screen name={EScreens.Tabs} component={Tabs} />
    </RootStack.Group>

    <RootStack.Group screenOptions={{ presentation: "modal" }}>
      <Tab.Screen name={EScreens.TaskEditor} component={TaskEditor} />
    </RootStack.Group>
  </RootStack.Navigator>
);

export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;
