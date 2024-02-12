import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export const Settings = () => {
  return (
    <SafeAreaView style={styles.saveArea}>
      <Text>Settings</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  saveArea: {
    flex: 1,
  },
});
