import { useMemo, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AnswerOptionCard } from '../components/game/AnswerOptionCard';
import { BottomBar } from '../components/layout/BottomBar';
import { AppText } from '../components/ui/AppText';
import { useTheme } from '../hooks/useTheme';
import { ROUTES } from '../navigation/routes';
import { RADIUS, SPACING } from '../styles/theme';

const ANSWERS = ['Perro', 'Mariposa', 'Tortuga', 'Elefante'];
const CORRECT_ANSWER = 'Mariposa';

export default function GameScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const isCorrect = selectedAnswer === CORRECT_ANSWER;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <AppText
          size={22}
          bold
          color={colors.primaryDark}
          onPress={() => router.replace(ROUTES.HOME)}
          accessibilityRole="button"
          accessibilityLabel="Volver al inicio"
        >
          ‹
        </AppText>
        <View style={styles.headerText}>
          <AppText size={18} bold color={colors.text}>¡Vamos a jugar!</AppText>
          <AppText size={13} color={colors.textMuted}>Reto 1 de 1</AppText>
        </View>
        <AppText size={14} bold color={colors.warning}>★ 1</AppText>
      </View>

      <View style={styles.content}>
        <View style={styles.questionCard}>
          <AppText size={13} bold color={colors.primaryDark} style={styles.eyebrow}>
            OBSERVA Y ELIGE
          </AppText>
          <AppText size={20} bold color={colors.text} style={styles.question}>
            ¿Cuál de estos animales puede volar?
          </AppText>
        </View>

        <View style={styles.imageStage}>
          <View style={styles.imageBackdrop} />
          <Image
            source={require('../assets/images/Static.png')}
            resizeMode="contain"
            style={styles.image}
            accessibilityLabel="Personaje del juego"
          />
        </View>

        <View style={styles.answers}>
          {[0, 1].map((row) => (
            <View key={row} style={styles.answerRow}>
              {ANSWERS.slice(row * 2, row * 2 + 2).map((answer) => (
                <AnswerOptionCard
                  key={answer}
                  label={answer}
                  selected={selectedAnswer === answer}
                  correct={answer === CORRECT_ANSWER}
                  answered={selectedAnswer !== null}
                  onPress={() => setSelectedAnswer(answer)}
                />
              ))}
            </View>
          ))}
        </View>

        {selectedAnswer && (
          <View
            accessibilityLiveRegion="polite"
            style={[
              styles.feedback,
              isCorrect ? styles.correctFeedback : styles.tryAgainFeedback,
            ]}
          >
            <AppText size={16} bold color={colors.text}>
              {isCorrect ? '¡Muy bien! La mariposa puede volar.' : '¡Buen intento! La respuesta era Mariposa.'}
            </AppText>
          </View>
        )}
      </View>

      <BottomBar mode="kids" activeRoute={ROUTES.GAME} />
    </SafeAreaView>
  );
}

const makeStyles = (colors: ReturnType<typeof useTheme>['colors']) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      minHeight: 68,
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.md,
      paddingHorizontal: SPACING.lg,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    headerText: {
      flex: 1,
      gap: 2,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: SPACING.lg,
      padding: SPACING.lg,
    },
    questionCard: {
      width: '100%',
      maxWidth: 520,
      padding: SPACING.lg,
      alignItems: 'center',
      gap: SPACING.xs,
      borderRadius: RADIUS.lg,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    eyebrow: {
      letterSpacing: 1,
    },
    question: {
      textAlign: 'center',
    },
    imageStage: {
      width: 170,
      height: 170,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageBackdrop: {
      position: 'absolute',
      width: 150,
      height: 150,
      borderRadius: RADIUS.pill,
      backgroundColor: colors.primaryLight,
    },
    image: {
      width: 145,
      height: 145,
    },
    answers: {
      width: '100%',
      maxWidth: 520,
      gap: SPACING.sm,
    },
    answerRow: {
      flexDirection: 'row',
      gap: SPACING.sm,
    },
    feedback: {
      width: '100%',
      maxWidth: 520,
      padding: SPACING.md,
      borderRadius: RADIUS.md,
    },
    correctFeedback: {
      backgroundColor: colors.successLight,
    },
    tryAgainFeedback: {
      backgroundColor: colors.secondaryLight,
    },
  });
