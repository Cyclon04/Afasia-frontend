// src/styles/settingsStyles.ts
import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, RADIUS, SPACING } from './theme';

export const settingsStyles = StyleSheet.create({
  // Contenedor general
  content: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxl,
    gap: SPACING.lg,
  },

  // ---------- Encabezado (avatar + nombre) ----------
  header: {
    alignItems: 'center',
    gap: SPACING.sm,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  name: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.primaryDark,
    letterSpacing: 0.2,
  },

  // ---------- Tarjeta de configuración ----------
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,

    // Sombra suave
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },

  cardTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.text,
  },

  cardTitleDivider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginBottom: SPACING.xs,
  },

  cardInnerDivider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: SPACING.xs,
  },
});