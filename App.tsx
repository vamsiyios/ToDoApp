import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, Appearance } from 'react-native';
import { store, RootState } from './src/redux/store';
import AddTaskForm from './src/components/AddTaskForm';
import TaskList from './src/components/TaskList';
import { loadTasks } from './src/utils/storage';
import { setTasks } from './src/redux/tasksSlice';
import { getColors } from './src/theme/colors';
import { SPACING } from './src/theme/constants';
import Header from './src/components/Header'; // ✅ fixed path

const Main = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const systemTheme = Appearance.getColorScheme();
  const colors = getColors(themeMode === 'system' ? systemTheme : themeMode);

  useEffect(() => {
    (async () => {
      const savedTasks = await loadTasks();
      dispatch(setTasks(savedTasks));
    })();
  }, [dispatch]);

  return (
    <SafeAreaView style={{ padding: SPACING, flex: 1, backgroundColor: colors.background }}>
      <Header /> 
      <AddTaskForm />
      <TaskList />
    </SafeAreaView>
  );
};

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;
