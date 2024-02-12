import React, { useMemo } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import {
  useGlobalActorRef,
  useGlobalSelector,
} from "../contexts/GlobalContext";
import TaskView from "../components/TaskView";
import { Task } from "../models/Task";
import AppButton from "../components/AppButton";

export const TasksList = () => {
  const { send } = useGlobalActorRef();

  const currentTasks = useGlobalSelector((state) => state.context.tasks);
  const data: Task[] = useMemo(
    () => currentTasks.filter((item) => !item.completed),
    [currentTasks]
  );

  const handleAddTask = () => send("SHOW_EDITOR");

  return (
    <SafeAreaView style={styles.saveArea}>
      <View style={styles.head}>
        <Text style={styles.count}>{`To do: ${currentTasks?.length}`}</Text>

        <AppButton
          label="Add new task"
          onPress={handleAddTask}
          variant="outlined"
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskView task={item} style={styles.taskView} />
        )}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  saveArea: {
    flex: 1,
  },
  head: {
    marginHorizontal: 16,
    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  count: {
    fontSize: 16,
    fontWeight: "600",
  },
  list: {
    flexGrow: 1,
  },
  taskView: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
});
