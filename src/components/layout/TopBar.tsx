// src/components/layout/TopBar.tsx
import { useMemo } from 'react';
import {
    Image,
    ImageSourcePropType,
    Pressable,
    StyleSheet,
    View,
} from 'react-native';

import { useTheme } from '../../hooks/useTheme';
import { FONT_SIZE, RADIUS, SPACING } from '../../styles/theme';
import { AppText } from '../ui/AppText';

const ICONS = {
  fire: require('../../assets/images/fuego.png'),
  coin: require('../../assets/images/usd-circulo.png'),
};

interface Props {
  streak: number;
  coins: number;
  avatarSource: ImageSourcePropType;
  onAvatarPress?: () => void;
}

export const TopBar = ({
  streak,
  coins,
  avatarSource,
  onAvatarPress,
}: Props) => {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      {/* ─── Racha (cápsula suave) ─── */}
      <View style={styles.statPill}>
        <Image source={ICONS.fire} style={styles.statIcon} resizeMode="contain" />
        <AppText
          size={FONT_SIZE.sm}
          bold
          color={colors.text}
          accessibilityLabel={`${streak} días seguidos`}
        >
          {streak}
        </AppText>
      </View>

      {/* ─── Monedas (cápsula suave) ─── */}
      <View style={styles.statPill}>
        <Image source={ICONS.coin} style={styles.statIcon} resizeMode="contain" />
        <AppText
          size={FONT_SIZE.sm}
          bold
          color={colors.text}
          accessibilityLabel={`${coins} estrellas`}
        >
          {coins}
        </AppText>
      </View>

      {/* ─── Espaciador para separar avatar a la derecha ─── */}
      <View style={styles.spacer} />

      {/* ─── Avatar con anillo cálido ─── */}
      <Pressable
        onPress={onAvatarPress}
        accessibilityRole="button"
        accessibilityLabel="Abrir perfil"
        style={({ pressed }) => [
          styles.avatarButton,
          pressed && styles.avatarButtonPressed,
        ]}
      >
        <View style={styles.avatarRing}>
          <Image
            source={avatarSource}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>
      </Pressable>
    </View>
  );
};

const makeStyles = (colors: ReturnType<typeof useTheme>['colors']) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.md,
      gap: SPACING.sm,
      backgroundColor: colors.background,
    },

    statPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.xs,
      paddingHorizontal: SPACING.md,
      paddingVertical: 8,
      borderRadius: RADIUS.pill,
      backgroundColor: colors.surfaceAlt,
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 1,
    },

    statIcon: {
      width: 20,
      height: 20,
    },

    spacer: {
      flex: 1,
    },

    avatarButton: {
      borderRadius: RADIUS.pill,
    },

    avatarButtonPressed: {
      transform: [{ scale: 0.94 }],
      opacity: 0.9,
    },

    avatarRing: {
      width: 52,
      height: 52,
      borderRadius: RADIUS.pill,
      padding: 3,
      backgroundColor: colors.primaryLight,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 6,
      elevation: 2,
    },

    avatar: {
      width: 44,
      height: 44,
      borderRadius: RADIUS.pill,
    },
  });