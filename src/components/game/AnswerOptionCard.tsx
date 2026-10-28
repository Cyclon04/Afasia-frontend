import { useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { useTheme } from '../../hooks/useTheme';
import { RADIUS, SPACING } from '../../styles/theme';
import { AppText } from '../ui/AppText';

interface AnswerOptionCardProps {
  label: string;
  selected: boolean;
  correct: boolean;
  answered: boolean;
  onPress: () => void;
}

export function AnswerOptionCard({
  label,
  selected,
  correct,
  answered,
  onPress,
}: AnswerOptionCardProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const resultStyle = answered
    ? correct
      ? styles.correct
      : selected
        ? styles.incorrect
        : undefined
    : selected
      ? styles.selected
      : undefined;
  const textColor =
    answered && (correct || selected)
      ? colors.text
      : selected
        ? colors.primaryDark
        : colors.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      disabled={answered}
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        resultStyle,
        pressed && !answered && styles.pressed,
      ]}
    >
      <AppText size={15} bold color={textColor} style={styles.label}>
        {label}
      </AppText>
    </Pressable>
  );
}

const makeStyles = (colors: ReturnType<typeof useTheme>['colors']) =>
  StyleSheet.create({
    option: {
      flex: 1,
      minHeight: 74,
      padding: SPACING.md,
      justifyContent: 'center',
      backgroundColor: colors.surface,
      borderRadius: RADIUS.md,
      borderWidth: 1.5,
      borderColor: colors.border,
    },
    selected: {
      borderColor: colors.primary,
      backgroundColor: colors.primaryLight,
    },
    correct: {
      borderColor: colors.success,
      backgroundColor: colors.successLight,
    },
    incorrect: {
      borderColor: colors.danger,
      backgroundColor: colors.secondaryLight,
    },
    pressed: {
      transform: [{ scale: 0.98 }],
    },
    label: {
      textAlign: 'center',
    },
  });
