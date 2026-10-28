// src/components/layout/WelcomeCard.tsx
import { useMemo } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '../../hooks/useTheme';
import { FONT_SIZE, RADIUS, SPACING } from '../../styles/theme';
import { AppText } from '../ui/AppText';

const ICONS = {
  microphone: require('../../assets/images/microfono-circular.png'),
};

interface Props {
  message: string;
  onMicPress?: () => void;
}

export const WelcomeCard = ({ message, onMicPress }: Props) => {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <View style={[styles.cornerDecoration, styles.topLeft]}>
          <View style={[styles.cornerDot, { backgroundColor: colors.primaryLight }]} />
        </View>

        <View style={[styles.cornerDecoration, styles.bottomRight]}>
          <View style={[styles.cornerDot, { backgroundColor: colors.secondaryLight }]} />
        </View>

        <AppText
          size={FONT_SIZE.md}
          bold
          color={colors.text}
          style={styles.text}
        >
          {message}
        </AppText>

        <Pressable
          onPress={onMicPress}
          accessibilityRole="button"
          accessibilityLabel="Grabar respuesta"
          style={({ pressed }) => [
            styles.micButton,
            {
              backgroundColor: colors.primary,
              borderColor: colors.surface,
              shadowColor: colors.shadowColor,
            },
            pressed && styles.micButtonPressed,
          ]}
          android_ripple={{
            color: colors.primaryDark,
            borderless: true,
            radius: 28,
          }}
        >
          <Image
            source={ICONS.microphone}
            style={styles.micIcon}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </View>
  );
};

const makeStyles = (colors: ReturnType<typeof useTheme>['colors']) =>
  StyleSheet.create({
    wrapper: {
      width: '100%',
      maxWidth: 420,
      alignSelf: 'center',
    },

    card: {
      borderRadius: RADIUS.xl,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      paddingVertical: SPACING.lg,
      paddingHorizontal: SPACING.xl,
      minHeight: 130,
      paddingBottom: 58,
      justifyContent: 'center',
      overflow: 'hidden',
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.07,
      shadowRadius: 12,
      elevation: 2,
    },

    text: {
      textAlign: 'center',
      lineHeight: 25,
      letterSpacing: 0.1,
      paddingHorizontal: SPACING.md,
    },

    cornerDecoration: {
      position: 'absolute',
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    topLeft: {
      top: 8,
      left: 8,
    },
    bottomRight: {
      bottom: 8,
      right: 8,
    },
    cornerDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      opacity: 0.6,
    },

    micButton: {
      position: 'absolute',
      left: SPACING.lg,
      bottom: SPACING.sm,
      width: 48,
      height: 48,
      borderRadius: RADIUS.pill,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 4,
      elevation: 3,
    },

    micButtonPressed: {
      transform: [{ scale: 0.9 }],
      opacity: 0.9,
    },

    micIcon: {
      width: 20,
      height: 20,
    },
  });