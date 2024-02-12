import React, { useMemo } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useGlobalSelector } from "../contexts/GlobalContext";
import TaskView from "../components/TaskView";
import { Task } from "../models/Task";

export const History = () => {
  const tasks = useGlobalSelector((state) => state.context.tasks);
  const data: Task[] = useMemo(
    () => tasks.filter((item) => item.completed),
    [tasks]
  );

  return (
    <SafeAreaView style={styles.saveArea}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskView task={item} style={styles.taskView} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  saveArea: {
    flex: 1,
  },
  taskView: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
});
