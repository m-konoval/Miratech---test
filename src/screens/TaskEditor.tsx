import React, { useEffect, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import {
  useGlobalActorRef,
  useGlobalSelector,
} from "../contexts/GlobalContext";
import InputField from "../components/InputField";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppButton from "../components/AppButton";

export const TaskEditor = () => {
  const currentTask = useGlobalSelector((state) => state.context.currentTask);
  const { send } = useGlobalActorRef();
  const { bottom } = useSafeAreaInsets();

  const isValidTitle = useMemo(
    () => Boolean(!currentTask?.title || currentTask?.title?.length <= 40),
    [currentTask?.title]
  );

  useEffect(() => {
    return () => send("CANCEL");
  }, [send]);

  const handleEditTitle = (text: string) =>
    send({ type: "EDIT", data: { title: text } });
  const handleEditDescription = (text: string) =>
    send({ type: "EDIT", data: { description: text } });

  const handleSave = () => {
    if (!isValidTitle) return;

    if (currentTask?.id) {
      send({ type: "SAVE" });
    } else {
      send({ type: "CREATE" });
    }
  };
  const handleCancel = () => send({ type: "CANCEL" });

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <InputField
        placeholder="Title"
        value={currentTask?.title}
        onChangeText={handleEditTitle}
        isError={!isValidTitle}
        errorMessage="Max length 40 chars"
      />

      <InputField
        containerStyle={styles.description}
        multiline
        placeholder="Description"
        value={currentTask?.description ?? ""}
        onChangeText={handleEditDescription}
      />

      <View style={styles.footer}>
        <AppButton label="Save" onPress={handleSave} style={styles.button} />

        <AppButton
          label="Cancel"
          onPress={handleCancel}
          variant="secondary"
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 16,
    height: "75%",
    padding: 4,
    paddingTop: 24,
  },
  description: {
    flex: 2,
  },
  footer: {
    flex: 1,
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  button: {
    width: "46%",
  },
});
