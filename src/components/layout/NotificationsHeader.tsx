// src/components/layout/NotificationsHeader.tsx
import { useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '../../hooks/useTheme';
import { FONT_SIZE, RADIUS, SPACING } from '../../styles/theme';
import { AppText } from '../ui/AppText';

const BELL_ICON = require('../../assets/images/campana.png');
const BELL_MUTED_ICON = require('../../assets/images/corte-de-campana.png');

interface Props {
  title?: string;
  total: number;
  onBellPress?: (muted: boolean) => void;
}

export const NotificationsHeader = ({
  title = 'Notificaciones',
  total,
  onBellPress,
}: Props) => {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [isMuted, setIsMuted] = useState(false);

  const handleToggle = () => {
    const next = !isMuted;
    setIsMuted(next);
    onBellPress?.(next);
  };

  return (
    <View style={styles.container}>
      {/* ─── Textos ─── */}
      <View style={styles.texts}>
        <AppText
          size={FONT_SIZE.xl}
          bold
          color={colors.primaryDark}
          style={styles.title}
        >
          {title}
        </AppText>

        <AppText size={FONT_SIZE.sm} color={colors.textMuted}>
          Tienes{' '}
          <AppText size={FONT_SIZE.sm} bold color={colors.primaryDark}>
            {total} notificaciones
          </AppText>{' '}
          nuevas
        </AppText>
      </View>

      {/* ─── Botón campana ─── */}
      <Pressable
        onPress={handleToggle}
        style={({ pressed }) => [
          styles.bellButton,
          isMuted && styles.bellButtonMuted,
          pressed && styles.bellButtonPressed,
        ]}
        android_ripple={{
          color: colors.primaryLight,
          borderless: true,
          radius: 28,
        }}
      >
        <Image
          source={isMuted ? BELL_MUTED_ICON : BELL_ICON}
          style={styles.icon}
          resizeMode="contain"
        />

        {/* 🔴 Punto rosa de "hay nuevas" (se oculta al silenciar) */}
        {!isMuted && total > 0 && (
          <View
            style={[
              styles.unreadDot,
              { backgroundColor: colors.badge, borderColor: colors.surface },
            ]}
          />
        )}
      </Pressable>
    </View>
  );
};

const makeStyles = (colors: ReturnType<typeof useTheme>['colors']) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: SPACING.xl,
      gap: SPACING.md,
    },

    texts: {
      flexShrink: 1,
      gap: SPACING.xs,
    },

    title: {
      letterSpacing: 0.3,
    },

    // ─── Botón campana: círculo suave y cálido ───
    bellButton: {
      width: 48,
      height: 48,
      borderRadius: RADIUS.pill,
      justifyContent: 'center',
      alignItems: 'center',

      // Fondo crema cálido (no blanco puro)
      backgroundColor: colors.primaryLight,

      // Sombra muy difusa y suave hacia abajo
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 2,
    },

    // Estado silenciado: fondo más tenue
    bellButtonMuted: {
      backgroundColor: colors.borderLight,
      shadowOpacity: 0.03,
      elevation: 0,
    },

    // Feedback al presionar: se achica muy sutil
    bellButtonPressed: {
      transform: [{ scale: 0.92 }],
      opacity: 0.85,
    },

    icon: {
      width: 24,
      height: 24,
    },

    // ─── Puntito rosa "no leído" ───
    unreadDot: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 10,
      height: 10,
      borderRadius: 5,
      borderWidth: 2, // borde del color del fondo para efecto "recortado"
    },
  });