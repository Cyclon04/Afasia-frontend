// src/components/layout/BottomBar.tsx
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '../../hooks/useTheme';
import { ROUTES } from '../../navigation/routes';
import { FONT_SIZE, RADIUS, SPACING } from '../../styles/theme';
import { AppText } from '../ui/AppText';

interface Props {
  onNavigate?: (route: string) => void;
  activeRoute?: string;
  mode?: 'kids' | 'parents';
}

const ITEMS = [
  {
    icon: require('../../assets/images/campana.png'),
    route: ROUTES.NOTIFICATIONS,
    label: 'Avisos',
    colorKey: 'primary',
  },
  {
    icon: require('../../assets/images/trofeo.png'),
    route: ROUTES.ACHIEVEMENTS,
    label: 'Logros',
    colorKey: 'warning',
  },
  {
    icon: require('../../assets/images/tienda.png'),
    route: ROUTES.REWARDS,
    label: 'Premios',
    colorKey: 'secondary',
  },
  {
    icon: require('../../assets/images/microfono-circular.png'),
    route: ROUTES.SUPPORT,
    label: 'Ayuda',
    colorKey: 'success',
  },
] as const;

export const BottomBar = ({
  onNavigate,
  activeRoute,
  mode = 'kids',
}: Props) => {
  const { colors } = useTheme();
  const router = useRouter();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const modeItem =
    mode === 'parents'
      ? {
          icon: undefined,
          symbol: '✦',
          route: ROUTES.CHATBOT,
          label: 'Chatbot',
          colorKey: 'info' as const,
        }
      : {
          icon: require('../../assets/images/mando.png'),
          symbol: undefined,
          route: ROUTES.GAME,
          label: 'Jugar',
          colorKey: 'success' as const,
        };
  const items = [...ITEMS.map((item) => ({ ...item, symbol: undefined })), modeItem];

  const handlePress = (route: string) => {
    if (onNavigate) return onNavigate(route);
    router.push(route as never);
  };

  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isActive = activeRoute === item.route;
        const accent = colors[item.colorKey];
        const accentSoft = accent + '30';
        const accentFaint = accent + '15';

        return (
          <Pressable
            key={item.route}
            onPress={() => handlePress(item.route)}
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.iconButtonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            android_ripple={{
              color: accentSoft,
              borderless: true,
              radius: 28,
            }}
          >
            <View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: isActive ? accentSoft : accentFaint,
                  borderColor: isActive ? accent : 'transparent',
                },
              ]}
            >
              {item.icon ? (
                <Image
                  source={item.icon}
                  style={[
                    styles.icon,
                    {
                      tintColor: isActive ? accent : colors.text,
                      opacity: isActive ? 1 : 0.85,
                    },
                  ]}
                  resizeMode="contain"
                />
              ) : (
                <AppText
                  size={22}
                  bold
                  color={isActive ? accent : colors.text}
                >
                  {item.symbol}
                </AppText>
              )}
            </View>

            {isActive && (
              <View
                style={[styles.activeDot, { backgroundColor: accent }]}
              />
            )}
            <AppText
              size={FONT_SIZE.xs}
              bold={isActive}
              color={isActive ? colors.primaryDark : colors.textMuted}
              style={styles.label}
            >
              {item.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
};

const makeStyles = (colors: ReturnType<typeof useTheme>['colors']) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingTop: SPACING.sm,
      paddingBottom: SPACING.md,
      paddingHorizontal: SPACING.lg,
      borderTopWidth: 1,
      borderTopColor: colors.borderLight,
      backgroundColor: colors.surface,
    },

    iconButton: {
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 62,
      paddingVertical: 4,
      borderRadius: RADIUS.pill,
    },
    iconButtonPressed: {
      transform: [{ scale: 0.92 }],
    },

    iconCircle: {
      width: 40,
      height: 40,
      borderRadius: RADIUS.pill,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1.5,
    },

    icon: {
      width: 22,
      height: 22,
    },

    activeDot: {
      position: 'absolute',
      top: 1,
      right: 2,
      width: 7,
      height: 7,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colors.surface,
    },

    label: {
      marginTop: 3,
    },
  });