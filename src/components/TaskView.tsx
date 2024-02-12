import React from "react";
import { Task } from "../models/Task";
import {
  View,
  Text,
  StyleSheet,
  ViewProps,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useGlobalActorRef } from "../contexts/GlobalContext";
import DoneIcon from "../../assets/icons/done.svg";
import UndoIcon from "../../assets/icons/undo.svg";
import DeleteIcon from "../../assets/icons/delete.svg";

interface IProps extends ViewProps {
  task: Task;
}

const TaskView: React.FC<IProps> = ({ task, style, ...rest }) => {
  const { send } = useGlobalActorRef();

  const handleEdit = () => send({ type: "SHOW_EDITOR", taskID: task.id });
  const handleComplete = () => {
    send({ type: "TOGGLE_TASK", taskID: task.id });
    send({ type: "UPDATE_TASKS" });
  };

  const handleDelete = () => {
    send({ type: "DELETE_TASK", taskID: task.id });
  };

  return (
    <View style={[styles.container, style]} {...rest}>
      <View style={styles.mainSection}>
        <TouchableOpacity onPress={handleComplete} style={styles.touchable}>
          {task.completed ? (
            <UndoIcon style={styles.icon} color={"#007aff"} />
          ) : (
            <DoneIcon style={styles.icon} color={"#007aff"} />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleEdit} style={styles.titleTouchable}>
          <Text style={styles.title}>{task.title}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDelete} style={styles.touchable}>
          <DeleteIcon style={styles.icon} color="#FF2E29" />
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{task.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "#909090",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: "white",

    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 1)",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: {
          height: 5,
          width: 0,
        },
      },
      android: {
        elevation: 5,
        backgroundColor: "rgba(0, 0, 0, 1)",
      },
    }),
  },
  mainSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
  },
  title: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "bold",
  },
  titleTouchable: {
    flex: 1,
    marginHorizontal: 10,
  },
  touchable: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    marginTop: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default React.memo(TaskView);
