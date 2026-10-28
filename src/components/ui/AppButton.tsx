import { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { FONT_SIZE, RADIUS, SPACING } from '../../styles/theme';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

export const AppButton = ({
  title,
  onPress,
  style,
  disabled = false,
}: AppButtonProps) => {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.82}
      style={[styles.button, disabled && styles.disabled, style]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const makeStyles = (colors: ReturnType<typeof useTheme>['colors']) =>
  StyleSheet.create({
    button: {
      minHeight: 54,
      backgroundColor: colors.primary,
      paddingVertical: SPACING.md,
      paddingHorizontal: SPACING.xl,
      borderRadius: RADIUS.md,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.primaryDark,
      shadowColor: colors.primaryDark,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.16,
      shadowRadius: 4,
      elevation: 2,
    },
    text: {
      color: colors.textInverse,
      fontSize: FONT_SIZE.md,
      fontWeight: '700',
    },
    disabled: {
      opacity: 0.5,
    },
  });
