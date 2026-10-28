// src/components/layout/ProfileHeader.tsx
import { useMemo } from 'react';
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    View,
} from 'react-native';

import { useTheme } from '../../hooks/useTheme';
import { FONT_SIZE, RADIUS, SPACING } from '../../styles/theme';
import { AppText } from '../ui/AppText';

interface Props {
  name: string;
  avatar: ImageSourcePropType;
  /** Tamaño del avatar (por defecto 110) */
  size?: number;
}

export const ProfileHeader = ({ name, avatar, size = 110 }: Props) => {
  const { colors } = useTheme();
  const styles = useMemo(
    () => makeStyles(colors, size),
    [colors, size]
  );

  return (
    <View style={styles.container}>
      {/* Anillo exterior suave (como marco de retrato) */}
      <View style={styles.avatarRing}>
        <View style={styles.avatarInner}>
          <Image source={avatar} style={styles.avatar} resizeMode="cover" />
        </View>
      </View>

      {/* Nombre con tipografía cálida */}
      <AppText
        size={FONT_SIZE.xl}
        bold
        color={colors.primary}
        style={styles.name}
      >
        {name}
      </AppText>

      {/* Línea decorativa sutil debajo del nombre (estilo SumOne) */}
      <View
        style={[
          styles.nameAccent,
          { backgroundColor: colors.primaryLight },
        ]}
      />
    </View>
  );
};

const makeStyles = (
  colors: ReturnType<typeof useTheme>['colors'],
  size: number
) => {
  const ringSize = size + 12;   // anillo exterior
  const innerSize = size + 4;   // aro blanco interno

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: SPACING.sm,
    },

    // ─── Anillo exterior: sombra suave y fondo cálido ───
    avatarRing: {
      width: ringSize,
      height: ringSize,
      borderRadius: RADIUS.pill,
      justifyContent: 'center',
      alignItems: 'center',

      // Fondo crema cálido que rodea el avatar
      backgroundColor: colors.primaryLight,

      // Sombra muy difusa y baja opacidad (efecto libro de cuentos)
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.07,
      shadowRadius: 10,
      elevation: 3,
    },

    // ─── Aro blanco interno: separa el avatar del anillo ───
    avatarInner: {
      width: innerSize,
      height: innerSize,
      borderRadius: RADIUS.pill,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.surface,
      padding: 2,
    },

    avatar: {
      width: size,
      height: size,
      borderRadius: RADIUS.pill,
    },

    // ─── Nombre ───
    name: {
      letterSpacing: 0.4,
      marginTop: SPACING.xs,
    },

    // ─── Línea decorativa debajo del nombre ───
    nameAccent: {
      width: 40,
      height: 3,
      borderRadius: 2,
      marginTop: 2,
      opacity: 0.85,
    },
  });
};