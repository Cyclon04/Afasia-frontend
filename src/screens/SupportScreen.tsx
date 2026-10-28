import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { FeatureScreen } from '../components/layout/FeatureScreen';
import { AppCard } from '../components/ui/AppCard';
import { AppText } from '../components/ui/AppText';
import { FeatureCard } from '../components/ui/FeatureCard';
import { useTheme } from '../hooks/useTheme';
import { ROUTES } from '../navigation/routes';
import { FONT_SIZE, RADIUS, SPACING } from '../styles/theme';

const HELP_TOPICS = [
  {
    icon: '🎙️',
    title: '¿Cómo respondo?',
    description: 'Toca el micrófono y habla con calma. Puedes intentarlo otra vez.',
    accent: 'primary' as const,
  },
  {
    icon: '⭐',
    title: '¿Cómo gano estrellas?',
    description: 'Completa tus actividades y celebra cada pequeño avance.',
    accent: 'warning' as const,
  },
  {
    icon: '👨‍👩‍👧',
    title: '¿Necesitas más ayuda?',
    description: 'Pide a una persona adulta de confianza que te acompañe.',
    accent: 'secondary' as const,
  },
];

export default function SupportScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <FeatureScreen
      title="¿Cómo te ayudamos?"
      subtitle="Aquí tienes algunas respuestas para seguir con tranquilidad."
      activeRoute={ROUTES.SUPPORT}
    >
      <AppCard style={styles.welcome}>
        <AppText size={FONT_SIZE.xl}>💚</AppText>
        <View style={styles.welcomeCopy}>
          <AppText size={FONT_SIZE.md} bold color={colors.text}>
            ¡Estamos para acompañarte!
          </AppText>
          <AppText size={FONT_SIZE.sm} color={colors.textMuted}>
            Explora estos consejos cuando tengas una duda.
          </AppText>
        </View>
      </AppCard>
      <View style={styles.list}>
        {HELP_TOPICS.map((topic) => (
          <FeatureCard key={topic.title} {...topic} />
        ))}
      </View>
    </FeatureScreen>
  );
}

const makeStyles = (colors: ReturnType<typeof useTheme>['colors']) =>
  StyleSheet.create({
    welcome: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.md,
      borderRadius: RADIUS.lg,
      backgroundColor: colors.primaryLight,
      borderColor: colors.primaryLight,
    },
    welcomeCopy: {
      flex: 1,
      gap: 4,
    },
    list: {
      gap: SPACING.sm,
    },
  });
