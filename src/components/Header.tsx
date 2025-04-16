import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Appearance } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getColors } from '../theme/colors';
import { spacing } from '../theme/constants';
import { setTheme } from '../redux/themeSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const systemTheme = Platform.OS === 'web' ? 'light' : Appearance.getColorScheme() || 'light';
  const colors = getColors(themeMode === 'system' ? systemTheme : themeMode);

  const toggleTheme = () => {
    const next =
      themeMode === 'light'
        ? 'dark'
        : themeMode === 'dark'
        ? 'system'
        : 'light';
    dispatch(setTheme(next));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.text }]}>To-Do List ✅</Text>
      <View style={styles.row}>
        <Text style={[styles.subtitle, { color: colors.text }]}>Theme: {themeMode}</Text>
        <TouchableOpacity onPress={toggleTheme}>
          <MaterialCommunityIcons
            name={themeMode === 'dark' ? 'weather-night' : 'white-balance-sunny'}
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    borderRadius: spacing.sm,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
  },
});

export default Header;
