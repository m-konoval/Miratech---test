import React, {useEffect} from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';
import {useGlobalActorRef, useGlobalSelector} from '../contexts/GlobalContext';

export const TaskEditor = () => {
  const {send} = useGlobalActorRef();
  const currentTask = useGlobalSelector(state => state.context.currentTask);

  useEffect(() => {
    return () => send('CANCEL');
  }, [send]);

  const handleEditTitle = (text: string) =>
    send({type: 'EDIT', data: {title: text}});
  const handleEditDescription = (text: string) =>
    send({type: 'EDIT', data: {description: text}});

  const handleSave = () => send({type: 'SAVE', taskID: undefined});
  const handleCancel = () => send({type: 'CANCEL'});

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Title"
        value={currentTask?.title}
        onChangeText={handleEditTitle}
      />
      <TextInput
        style={[styles.textInput, styles.description]}
        multiline
        placeholder="Description"
        value={currentTask?.description ?? ''}
        onChangeText={handleEditDescription}
      />
      <View>
        <Button color="blue" title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={handleCancel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 8,
    height: '75%',
    padding: 4,
  },
  textInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 2,
  },
  description: {
    flex: 2,
  },
});
