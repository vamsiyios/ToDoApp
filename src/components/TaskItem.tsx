import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Task } from '../types/Task';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTask } from '../redux/tasksSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { spacing, CARD_SHADOW } from '../theme/constants';

const TaskItem = ({ task }: { task: Task }) => {
  const dispatch = useDispatch();

  return (
    <View
      style={[
        styles.card,
        task.completed && styles.doneCard,
      ]}
    >
      <View style={styles.row}>
        <TouchableOpacity onPress={() => dispatch(toggleTask(task.id))}>
          <MaterialIcons
            name={task.completed ? 'check-circle' : 'radio-button-unchecked'}
            size={24}
            color={task.completed ? '#4CAF50' : '#999'}
          />
        </TouchableOpacity>
        <View style={styles.textBlock}>
          <Text
            style={[
              styles.description,
              task.completed && styles.completed,
            ]}
          >
            {task.description}
          </Text>
          <Text style={styles.date}>Due: {task.dueDate}</Text>
        </View>
        <TouchableOpacity onPress={() => dispatch(deleteTask(task.id))}>
          <MaterialIcons name="delete" size={24} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E6E6FA', 
    borderRadius: spacing.md,
    padding: spacing.sm,
    marginBottom: spacing.xl,
  },
  doneCard: {
    backgroundColor: '#E0FFE0', 
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textBlock: {
    flex: 1,
    marginHorizontal: spacing.xl,
  },
  description: {
    fontSize: 24,
    fontWeight: '500',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  date: {
    fontSize: 18,
    color: '#666',
  },
});

export default TaskItem;
