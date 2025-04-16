import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface CalendarIconProps {
  onPress: () => void;
  color?: string;
}

const CalendarIcon = ({ onPress, color = '#333' }: CalendarIconProps) => (
  <TouchableOpacity onPress={onPress}>
    <MaterialIcons name="calendar-today" size={24} color={color} />
  </TouchableOpacity>
);

export default CalendarIcon;
