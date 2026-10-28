import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { FeatureScreen } from '../components/layout/FeatureScreen';
import { AppCard } from '../components/ui/AppCard';
import { AppText } from '../components/ui/AppText';
import { FeatureCard } from '../components/ui/FeatureCard';
import { useTheme } from '../hooks/useTheme';
import { ROUTES } from '../navigation/routes';
import { FONT_SIZE, RADIUS, SPACING } from '../styles/theme';

const REWARDS = [
  {
    icon: '🎨',
    title: 'Colores para tu avatar',
    description: 'Un nuevo look lleno de color.',
    detail: '80 estrellas',
    accent: 'secondary' as const,
  },
  {
    icon: '🧢',
    title: 'Gorra aventurera',
    description: 'Equipa a tu personaje para explorar.',
    detail: '120 estrellas',
    accent: 'primary' as const,
  },
  {
    icon: '✨',
    title: 'Brillo especial',
    description: 'Un efecto brillante para celebrar.',
    detail: '150 estrellas',
    accent: 'warning' as const,
  },
];

export default function RewardsScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <FeatureScreen
      title="Tienda de premios"
      subtitle="Elige una sorpresa para tus estrellas."
      activeRoute={ROUTES.REWARDS}
    >
      <AppCard style={styles.balance}>
        <AppText size={FONT_SIZE.xl} bold color={colors.text}>
          Tus estrellas
        </AppText>
        <View style={styles.balanceValue}>
          <AppText size={FONT_SIZE.xxl}>⭐</AppText>
          <AppText size={FONT_SIZE.xxl} bold color={colors.primaryDark}>
            100
          </AppText>
        </View>
        <AppText size={FONT_SIZE.sm} color={colors.textMuted}>
          ¡Gana más completando actividades!
        </AppText>
      </AppCard>

      <View style={styles.list}>
        {REWARDS.map((reward) => (
          <FeatureCard key={reward.title} {...reward} />
        ))}
      </View>
    </FeatureScreen>
  );
}

const makeStyles = (colors: ReturnType<typeof useTheme>['colors']) =>
  StyleSheet.create({
    balance: {
      alignItems: 'center',
      gap: SPACING.xs,
      borderRadius: RADIUS.lg,
      backgroundColor: colors.surface,
    },
    balanceValue: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.sm,
    },
    list: {
      gap: SPACING.sm,
    },
  });
