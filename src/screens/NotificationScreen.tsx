// src/screens/NotificationsScreen.tsx
import { useMemo } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { NotificationsHeader } from '../components/layout/NotificationsHeader';
import { BottomBar } from '../components/layout/BottomBar';
import { AppText } from '../components/ui/AppText';
import { NotificationItem } from '../components/ui/NotificationItem';

import { useTheme } from '../hooks/useTheme';
import { ROUTES } from '../navigation/routes';
import { FONT_SIZE, SPACING } from '../styles/theme';

const AVATARS = {
  carlos: require('../assets/images/avatar_generico.png'),
  karla: require('../assets/images/avatar_generico.png'),
  jose: require('../assets/images/avatar_generico.png'),
};

const NEW_NOTIFICATIONS = [
  { id: '1', avatar: AVATARS.carlos, message: 'Carlos aún no ha hecho su lección ❌' },
  { id: '2', avatar: AVATARS.karla, message: 'Karla completó una lección ✅' },
  { id: '3', avatar: AVATARS.jose, message: 'José hizo 3 nuevas lecciones 📚' },
];

const PAST_NOTIFICATIONS = [
  { id: '4', avatar: AVATARS.karla, message: 'Karla obtuvo un nuevo estilo 🕶️' },
  { id: '5', avatar: AVATARS.jose, message: 'José subió de nivel 🔥' },
  { id: '6', avatar: AVATARS.carlos, message: 'Carlos completó su lección ✅' },
];

export default function NotificationsScreen() {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <NotificationsHeader
          total={NEW_NOTIFICATIONS.length}
          onBellPress={() => console.log('Silenciar notificaciones')}
        />

        <View style={styles.notificationGroup}>
          {NEW_NOTIFICATIONS.map((item, index) => (
            <View key={item.id}>
              <NotificationItem
                avatar={item.avatar}
                message={item.message}
                unread
              />
              {index < NEW_NOTIFICATIONS.length - 1 && (
                <View style={styles.rowDivider} />
              )}
            </View>
          ))}
        </View>

        <AppText
          size={FONT_SIZE.lg}
          bold
          color={colors.text}
          style={styles.sectionTitle}
        >
          Notificaciones pasadas
        </AppText>

        <View style={styles.notificationGroup}>
          {PAST_NOTIFICATIONS.map((item, index) => (
            <View key={item.id}>
              <NotificationItem
                avatar={item.avatar}
                message={item.message}
                unread={false}
              />
              {index < PAST_NOTIFICATIONS.length - 1 && (
                <View style={styles.rowDivider} />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      <BottomBar activeRoute={ROUTES.NOTIFICATIONS} />
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
      paddingHorizontal: SPACING.lg,
      paddingTop: SPACING.xl,
      paddingBottom: SPACING.xxl,
      maxWidth: 760,
      width: '100%',
      alignSelf: 'center',
    },
    sectionTitle: {
      marginTop: SPACING.xxl,
      marginBottom: SPACING.lg,
    },
    notificationGroup: {
      paddingHorizontal: SPACING.xs,
      paddingVertical: SPACING.xs,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 2,
    },
    rowDivider: {
      height: 1,
      backgroundColor: colors.borderLight,
      marginHorizontal: SPACING.sm,
    },
  });