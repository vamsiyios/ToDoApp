import React, { useState } from 'react';
import {
  View,
  TextInput,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  Appearance,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../redux/tasksSlice';
import { Task } from '../types/Task';
import { getColors } from '../theme/colors';
import CalendarIcon from './CalendarIcon';
import { spacing } from '../theme/constants';
import { RootState } from '../redux/store';

const AddTaskForm = () => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const [descError, setDescError] = useState('');
  const [dateError, setDateError] = useState('');

  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const systemTheme = Appearance.getColorScheme();
  const colors = getColors(themeMode === 'system' ? systemTheme ?? 'light' : themeMode);
  const isDark = (themeMode === 'system' ? systemTheme : themeMode) === 'dark';

  const handleAdd = () => {
    let isValid = true;

    if (!description.trim()) {
      setDescError('Task description is required');
      isValid = false;
    } else {
      setDescError('');
    }

    if (!date) {
      setDateError('Date selection is required');
      isValid = false;
    } else {
      setDateError('');
    }

    if (!isValid) return;

    const newTask: Task = {
      id: Date.now().toString(),
      description: description.trim(),
      dueDate: new Intl.DateTimeFormat('en-US').format(date),
      completed: false,
    };

    dispatch(addTask(newTask));
    setDescription('');
    setDate(null);
    setDescError('');
    setDateError('');
  };

  const hasAnyInput = description.trim() !== '' || date !== null;

  const handleDateConfirm = () => {
    setDate(tempDate);
    setShowPicker(false);
    setDateError('');
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: '#F5FFFA',
            borderColor: isDark ? '#000' : colors.secondaryText,
          },
        ]}
      >
        <TextInput
          placeholder="Task Description"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, { color: isDark ? '#000' : colors.text }]}
          placeholderTextColor={isDark ? '#000' : colors.secondaryText}
        />
        <CalendarIcon onPress={() => {
          setTempDate(date || new Date());
          setShowPicker(true);
        }} />
      </View>

      {descError !== '' && <Text style={[styles.errorText, { color: 'red' }]}>{descError}</Text>}
      {dateError !== '' && <Text style={[styles.errorText, { color: 'red' }]}>{dateError}</Text>}

      {Platform.OS === 'ios' && (
        <Modal
          visible={showPicker}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowPicker(false)}
        >
          <View style={styles.modalBackdrop}>
            <View style={[styles.modalContainer, { backgroundColor: isDark ? '#1c1c1e' : '#fff' }]}>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                onChange={(_, selectedDate) => {
                  if (selectedDate) setTempDate(selectedDate);
                }}
                themeVariant={isDark ? 'dark' : 'light'}
                textColor={isDark ? '#fff' : undefined}
              />
              <TouchableOpacity style={styles.confirmBtn} onPress={handleDateConfirm}>
                <Text style={styles.confirmText}>Confirm Date</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowPicker(false)} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {Platform.OS === 'android' && showPicker && (
        <DateTimePicker
          value={date ?? new Date()}
          mode="date"
          display="default"
          onChange={(_, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) {
              setDate(selectedDate);
              setDateError('');
            }
          }}
        />
      )}

      <TouchableOpacity
        style={[
          styles.addButton,
          !hasAnyInput && { backgroundColor: '#999' },
        ]}
        onPress={handleAdd}
        disabled={!hasAnyInput}
      >
        <Text style={styles.addButtonText}>ADD TASK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.sm,
    gap: spacing.xl,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 22,
  },
  addButton: {
    backgroundColor: '#2563eb',
    paddingVertical: Platform.OS === 'ios' ? spacing.lg : spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: spacing.md,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xl,
    alignSelf: 'center',
    minWidth: 220,
  },
  addButtonText: {
    color: '#fff',
    fontSize: Platform.OS === 'ios' ? 17 : 19,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: 'bold',
  },
  errorText: {
    marginTop: -spacing.sm,
    marginLeft: spacing.sm,
    fontSize: 14,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    padding: spacing.lg,
    borderTopLeftRadius: spacing.md,
    borderTopRightRadius: spacing.md,
  },
  confirmBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: spacing.md,
    borderRadius: spacing.sm,
    marginTop: spacing.md,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelBtn: {
    marginTop: spacing.sm,
    alignItems: 'center',
  },
  cancelText: {
    color: '#ccc',
  },
});

export default AddTaskForm;
