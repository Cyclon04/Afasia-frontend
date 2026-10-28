import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '../../hooks/useTheme';
import { RADIUS, SPACING } from '../../styles/theme';
import { AppText } from '../ui/AppText';

interface ChatMessageBubbleProps {
  text: string;
  role: 'assistant' | 'user';
}

export function ChatMessageBubble({ text, role }: ChatMessageBubbleProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const isUser = role === 'user';

  return (
    <View style={[styles.row, isUser && styles.userRow]}>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
        <AppText size={15} color={isUser ? colors.textInverse : colors.text}>
          {text}
        </AppText>
      </View>
    </View>
  );
}

const makeStyles = (colors: ReturnType<typeof useTheme>['colors']) =>
  StyleSheet.create({
    row: {
      width: '100%',
      alignItems: 'flex-start',
      marginBottom: SPACING.sm,
    },
    userRow: {
      alignItems: 'flex-end',
    },
    bubble: {
      maxWidth: '88%',
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.sm,
      borderRadius: RADIUS.md,
    },
    assistantBubble: {
      backgroundColor: colors.surface,
      borderBottomLeftRadius: 6,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    userBubble: {
      backgroundColor: colors.primaryDark,
      borderBottomRightRadius: 6,
    },
  });
