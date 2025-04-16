import React from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Task } from '../types/Task';
import { RootState } from '../redux/store';
import TaskItem from './TaskItem';

type TaskListProps = {
  useFlatList?: boolean;
};

const TaskList: React.FC<TaskListProps> = ({ useFlatList = true }) => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  if (useFlatList) {
    return (
      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskItem task={item} />}
        keyExtractor={(item) => item.id}
      />
    );
  }

  return (
    <View style={{ gap: 1 }}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </View>
  );
};

export default TaskList;
