// src/screens/HomeScreen.tsx
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { FloatingCharacter } from '../components/character/FloatingCharacter';
import { BottomBar } from '../components/layout/BottomBar';
import { TopBar } from '../components/layout/TopBar';
import { WelcomeCard } from '../components/layout/WelcomeCard';
import { AppText } from '../components/ui/AppText';

import { useResponsive } from '../hooks/useResponsive';
import { useTheme } from '../hooks/useTheme';
import { ROUTES } from '../navigation/routes';
import { FONT_SIZE, SPACING } from '../styles/theme';

export function HomeDashboard({
  showMascot = true,
  mode = 'kids',
}: {
  showMascot?: boolean;
  mode?: 'kids' | 'parents';
}) {
  const { isMobile, height } = useResponsive();
  const { colors } = useTheme();
  const router = useRouter();
  const isCompact = height < 650;
  const characterSize = isCompact ? (isMobile ? 140 : 180) : isMobile ? 180 : 240;

  const styles = useMemo(
    () => makeStyles(colors, characterSize),
    [colors, characterSize]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopBar
        streak={4}
        coins={100}
        avatarSource={require('../assets/images/avatar_generico.png')}
        onAvatarPress={() => router.push(ROUTES.PROFILE)}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <AppText size={FONT_SIZE.lg} bold color={colors.primaryDark}>
            Tu aventura de hoy
          </AppText>
          <AppText size={14} color={colors.textMuted}>
            Un ratito para aprender y jugar
          </AppText>
        </View>
        {showMascot && (
          <View style={styles.characterStage}>
            <View style={styles.sunnyBackdrop} />
            <FloatingCharacter
              source={require('../assets/images/Static.png')}
              size={characterSize}
              duration={4200}
              floatDistance={7}
              scaleRange={1.015}
            />
          </View>
        )}

        <WelcomeCard
          message="¡Bienvenido de vuelta, Karla!"
          onMicPress={() => console.log('Micrófono presionado')}
        />
      </ScrollView>

      <BottomBar mode={mode} />
    </SafeAreaView>
  );
}

export default function HomeScreen() {
  return <HomeDashboard />;
}

const makeStyles = (
  colors: ReturnType<typeof useTheme>['colors'],
  characterSize: number
) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scroll: {
      flex: 1,
    },
    content: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: SPACING.lg,
      gap: SPACING.lg,
      paddingVertical: SPACING.lg,
    },
    intro: {
      alignItems: 'center',
      gap: SPACING.xs,
    },
    characterStage: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    sunnyBackdrop: {
      position: 'absolute',
      width: characterSize + 8,
      height: characterSize + 8,
      borderRadius: 999,
      backgroundColor: colors.primaryLight,
      opacity: 0.72,
    },
  });