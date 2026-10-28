// src/styles/notificationsStyles.ts
import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from './theme';

export const notificationsStyles = StyleSheet.create({
  // Contenedor con scroll
  content: {
    flexGrow: 1,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },

  // ---------- Encabezado ----------
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.xl,
  },
  headerTexts: {
    flexShrink: 1,
    gap: SPACING.xs,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '800',
    color: COLORS.primaryDark,
  },
  subtitle: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textMuted,
  },
  subtitleCount: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  bellButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ---------- Lista ----------
  list: {
    gap: SPACING.xs,
  },
  listDivider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: SPACING.xs,
  },

  // ---------- Sección "Notificaciones pasadas" ----------
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SPACING.xxl,
    marginBottom: SPACING.lg,
  },

  // ---------- Fila ----------
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    gap: SPACING.md,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.badge,
  },
  unreadDotPlaceholder: {
    width: 10,
    height: 10,
    backgroundColor: 'transparent',
  },
  avatarWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: COLORS.primaryLight,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  message: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    lineHeight: 22,
  },

  // Divisor entre filas
  rowDivider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
  },
});