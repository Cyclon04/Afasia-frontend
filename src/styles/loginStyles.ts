// src/styles/loginStyles.ts
import { StyleSheet } from 'react-native';
import { RADIUS, SPACING } from './theme';

export const loginStyles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.xl,
  },

  contentDesktop: {
    width: '70%',
    alignSelf: 'center',
  },

  card: {
    width: '100%',
    maxWidth: 400,
    gap: SPACING.md,
    borderRadius: RADIUS.lg,
  },

  cardDesktop: {
    maxWidth: 500,
  },
});