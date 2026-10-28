// src/screens/LoginScreen.tsx
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { FloatingCharacter } from '../components/character/FloatingCharacter';
import { AppCard } from '../components/ui/AppCard';
import { AppText } from '../components/ui/AppText';

import { useResponsive } from '../hooks/useResponsive';
import { useTheme } from '../hooks/useTheme';
import { FONT_SIZE, RADIUS, SPACING } from '../styles/theme';

export default function LoginScreen() {
  const { isMobile, isDesktop, height } = useResponsive();
  const isCompactLandscape = !isMobile && !isDesktop && height < 600;
  const isHorizontalLayout = isDesktop || isCompactLandscape;
  const { colors } = useTheme();
  const router = useRouter();

  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login:', { email, password });
    router.replace('/homeKids');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.content,
            isHorizontalLayout && styles.contentHorizontal,
            isDesktop ? styles.contentDesktop : isCompactLandscape && styles.contentCompact,
          ]}
        >
          <FloatingCharacter
            source={require('../assets/images/Static.png')}
            size={isMobile ? 180 : 220}
            duration={4200}
            floatDistance={7}
            scaleRange={1.015}
          />

          <AppCard style={[styles.card, isDesktop && styles.cardDesktop]}>
            <View style={styles.welcomeMark}>
              <Image
                source={require('../assets/images/avatar_generico.png')}
                style={styles.avatar}
                resizeMode="cover"
              />
            </View>
            <AppText
              size={isMobile ? 18 : 22}
              color={colors.text}
              style={styles.title}
            >
              ¡Qué gusto verte!
            </AppText>
            <AppText size={FONT_SIZE.sm} color={colors.textMuted} style={styles.subtitle}>
              Inicia sesión para continuar aprendiendo
            </AppText>

            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor={colors.textMuted}
              accessibilityLabel="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor={colors.textMuted}
              accessibilityLabel="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity
              style={[styles.button, { marginTop: 10 }]}
              onPress={handleLogin}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Entrar"
            >
              <AppText size={FONT_SIZE.md} bold color={colors.textInverse}>
                Entrar
              </AppText>
            </TouchableOpacity>
          </AppCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (colors: ReturnType<typeof useTheme>['colors']) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flexGrow: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: SPACING.lg,
      gap: SPACING.lg,
      paddingVertical: SPACING.xl,
    },
    contentDesktop: {
      width: '70%',
      alignSelf: 'center',
    },
    contentCompact: {
      width: '92%',
      alignSelf: 'center',
    },
    contentHorizontal: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: SPACING.lg,
    },
    card: {
      width: '100%',
      maxWidth: 400,
      gap: SPACING.sm,
      backgroundColor: colors.surface,
      borderColor: colors.border,
      alignItems: 'stretch',
      padding: SPACING.lg,
    },
    cardDesktop: {
      width: 420,
      maxWidth: 460,
    },
    welcomeMark: {
      width: 64,
      height: 64,
      alignSelf: 'center',
      marginBottom: SPACING.xs,
      padding: 4,
      borderRadius: RADIUS.pill,
      backgroundColor: colors.primaryLight,
    },
    avatar: {
      width: '100%',
      height: '100%',
      borderRadius: RADIUS.pill,
    },
    title: {
      textAlign: 'center',
      fontWeight: '800',
      marginBottom: 0,
    },
    subtitle: {
      textAlign: 'center',
      lineHeight: 21,
      marginBottom: SPACING.xs,
    },
    input: {
      width: '100%',
      height: 52,
      borderWidth: 1.5,
      borderColor: colors.border,
      borderRadius: RADIUS.md,
      paddingHorizontal: SPACING.md,
      fontSize: FONT_SIZE.md,
      color: colors.text,
      backgroundColor: colors.surfaceAlt,
    },
    button: {
      width: '100%',
      height: 52,
      borderRadius: RADIUS.md,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.primaryDark,
      shadowColor: colors.primaryDark,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.16,
      shadowRadius: 4,
      elevation: 2,
    },
  });