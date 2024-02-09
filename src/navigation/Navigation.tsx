import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, Text} from 'react-native';
import {History} from '../screens/History';
import {TaskEditor} from '../screens/TaskEditor';
import {TasksList} from '../screens/TasksList';
import {Settings} from '../screens/Settings';
import {useGlobalActorRef} from '../contexts/GlobalContext';

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    screenOptions={{headerShown: false}}
    sceneContainerStyle={{margin: 12}}>
    <Tab.Screen
      name="List"
      component={TasksList}
      options={{
        tabBarIcon: () => <Text style={{fontSize: 32}}>≔</Text>,
      }}
    />
    <Tab.Screen
      name="History"
      component={History}
      options={{tabBarIcon: () => <Text style={{fontSize: 32}}>↩︎</Text>}}
    />
    <Tab.Screen
      name="Settings"
      component={Settings}
      options={{tabBarIcon: () => <Text style={{fontSize: 32}}>⚙︎</Text>}}
    />
  </Tab.Navigator>
);

const AddNewTask = () => {
  const {send} = useGlobalActorRef();

  return <Button title="Add new task" onPress={() => send('SHOW_EDITOR')} />;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const MainNavigation = () => (
  <RootStack.Navigator
    screenOptions={{
      headerTitle: '🗓️',
    }}>
    <RootStack.Group
      screenOptions={{
        headerRight: AddNewTask,
      }}>
      <RootStack.Screen name="Tabs" component={Tabs} />
    </RootStack.Group>

    <RootStack.Group screenOptions={{presentation: 'modal'}}>
      <Tab.Screen name="TaskEditor" component={TaskEditor} />
    </RootStack.Group>
  </RootStack.Navigator>
);

export type RootStackParamList = {
  TaskEditor: {};
  Tabs: {};
};
