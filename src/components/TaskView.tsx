import React from 'react';
import {Task} from '../models/Task';
import {View, Text, StyleSheet} from 'react-native';

export const TaskView = ({task}: {task: Task}) => (
  <View style={styles.container}>
    <View style={styles.mainSection}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.check}>{task.completed ? '✅' : '▢'}</Text>
    </View>
    <Text>{task.description}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderRadius: 3,
    borderWidth: 1,
    padding: 4,
    margin: 2,
    backgroundColor: 'white',
  },
  mainSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  check: {
    fontSize: 24,
  },
});
