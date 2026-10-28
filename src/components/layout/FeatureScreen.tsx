import { ReactNode, useMemo } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { FONT_SIZE, SPACING } from '../../styles/theme';
import { AppText } from '../ui/AppText';
import { BottomBar } from './BottomBar';

interface Props {
  title: string;
  subtitle: string;
  activeRoute: string;
  children: ReactNode;
}

export function FeatureScreen({
  title,
  subtitle,
  activeRoute,
  children,
}: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heading}>
          <AppText size={FONT_SIZE.xxl} bold color={colors.primaryDark}>
            {title}
          </AppText>
          <AppText size={FONT_SIZE.md} color={colors.textMuted} style={styles.subtitle}>
            {subtitle}
          </AppText>
        </View>
        <View style={styles.body}>{children}</View>
      </ScrollView>
      <BottomBar activeRoute={activeRoute} />
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
      paddingBottom: SPACING.xl,
      gap: SPACING.xl,
    },
    heading: {
      width: '100%',
      maxWidth: 680,
      alignItems: 'center',
      gap: SPACING.xs,
    },
    subtitle: {
      textAlign: 'center',
      lineHeight: 23,
    },
    body: {
      width: '100%',
      maxWidth: 680,
      gap: SPACING.md,
    },
  });
