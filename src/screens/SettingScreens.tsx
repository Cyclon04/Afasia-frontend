// src/screens/SettingsScreen.tsx
import { useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { ProfileHeader } from '../components/layout/ProfileHeader';
import { BottomBar } from '../components/layout/BottomBar';
import { AppText } from '../components/ui/AppText';
import { SettingRow } from '../components/ui/SettingRow';

import { useTheme } from '../hooks/useTheme';
import { ROUTES } from '../navigation/routes';
import { FONT_SIZE, RADIUS, SPACING } from '../styles/theme';

export default function SettingsScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const router = useRouter();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [notificationsOn, setNotificationsOn] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader
          name="Helena"
          avatar={require('../assets/images/avatar_generico.png')}
        />

        <View style={styles.card}>
          <AppText size={FONT_SIZE.lg} bold color={colors.text}>
            Configuración
          </AppText>
          <View style={styles.cardTitleDivider} />

          <SettingRow
            label="Padres de familia"
            showChevron
            onPress={() => router.push(ROUTES.PARENTS_HOME)}
          />

          <SettingRow
            label="Hijos"
            showChevron
            onPress={() => router.push(ROUTES.HOME)}
          />

          {/* 🌗 Toggle del tema */}
          <SettingRow
            label="Modo oscuro"
            switchValue={isDark}
            onSwitchChange={toggleTheme}
            switchLabel={isDark ? 'ON' : 'OFF'}
          />

          {/* Toggle extra de ejemplo */}
          <SettingRow
            label="Notificaciones"
            switchValue={notificationsOn}
            onSwitchChange={setNotificationsOn}
            switchLabel={notificationsOn ? 'ON' : 'OFF'}
          />

          <View style={styles.cardInnerDivider} />

          <SettingRow
            label="Cuenta asociada"
            onPress={() => console.log('Cuenta asociada')}
          />

          <SettingRow
            label="Ajustes de app"
            onPress={() => console.log('Ajustes de app')}
          />
        </View>
      </ScrollView>
      <BottomBar activeRoute={ROUTES.PROFILE} />
    </SafeAreaView>
  );
}

const makeStyles = (colors: ReturnType<typeof useTheme>['colors']) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flexGrow: 1,
      alignItems: 'center',
      paddingHorizontal: SPACING.lg,
      paddingTop: SPACING.xl,
      paddingBottom: SPACING.xxl,
      gap: SPACING.lg,
    },
    card: {
      width: '100%',
      maxWidth: 420,
      backgroundColor: colors.surface,
      borderRadius: RADIUS.lg,
      borderWidth: 1,
      borderColor: colors.border,
      paddingVertical: SPACING.lg,
      paddingHorizontal: SPACING.lg,
      gap: SPACING.md,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.07,
      shadowRadius: 12,
      elevation: 3,
    },
    cardTitleDivider: {
      height: 1,
      backgroundColor: colors.borderLight,
      marginBottom: SPACING.xs,
    },
    cardInnerDivider: {
      height: 1,
      backgroundColor: colors.borderLight,
      marginVertical: SPACING.xs,
    },
  });