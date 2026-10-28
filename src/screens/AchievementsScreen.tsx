import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { FeatureScreen } from '../components/layout/FeatureScreen';
import { AppCard } from '../components/ui/AppCard';
import { AppText } from '../components/ui/AppText';
import { FeatureCard } from '../components/ui/FeatureCard';
import { useTheme } from '../hooks/useTheme';
import { ROUTES } from '../navigation/routes';
import { FONT_SIZE, RADIUS, SPACING } from '../styles/theme';

const ACHIEVEMENTS = [
  {
    icon: '🌟',
    title: 'Primera gran aventura',
    description: 'Completaste tu primera lección.',
    detail: '¡Desbloqueado!',
    accent: 'warning' as const,
  },
  {
    icon: '🔥',
    title: 'Racha brillante',
    description: 'Practica 3 días seguidos para conseguirlo.',
    detail: '2 de 3 días',
    accent: 'secondary' as const,
  },
  {
    icon: '🎤',
    title: 'Voz valiente',
    description: 'Completa 5 actividades hablando.',
    detail: '3 de 5 actividades',
    accent: 'primary' as const,
  },
];

export default function AchievementsScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <FeatureScreen
      title="Mis logros"
      subtitle="Cada paso que das merece celebrarse."
      activeRoute={ROUTES.ACHIEVEMENTS}
    >
      <AppCard style={styles.summary}>
        <AppText size={FONT_SIZE.xxl} bold color={colors.primaryDark}>
          1
        </AppText>
        <View style={styles.summaryCopy}>
          <AppText size={FONT_SIZE.md} bold color={colors.text}>
            Insignia conseguida
          </AppText>
          <AppText size={FONT_SIZE.sm} color={colors.textMuted}>
            ¡Sigue aprendiendo para ganar más!
          </AppText>
        </View>
      </AppCard>

      <View style={styles.list}>
        {ACHIEVEMENTS.map((achievement) => (
          <FeatureCard key={achievement.title} {...achievement} />
        ))}
      </View>
    </FeatureScreen>
  );
}

const makeStyles = (colors: ReturnType<typeof useTheme>['colors']) =>
  StyleSheet.create({
    summary: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.md,
      backgroundColor: colors.primaryLight,
      borderColor: colors.primaryLight,
      borderRadius: RADIUS.lg,
      padding: SPACING.lg,
    },
    summaryCopy: {
      flex: 1,
      gap: 4,
    },
    list: {
      gap: SPACING.sm,
    },
  });
