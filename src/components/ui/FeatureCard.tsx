import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { FONT_SIZE, RADIUS, SPACING } from '../../styles/theme';
import { AppCard } from './AppCard';
import { AppText } from './AppText';

interface Props {
  icon: string;
  title: string;
  description: string;
  detail?: string;
  accent?: 'primary' | 'secondary' | 'warning' | 'success';
}

export function FeatureCard({
  icon,
  title,
  description,
  detail,
  accent = 'primary',
}: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const accentColor = colors[accent];
  const accentBackground = {
    primary: colors.primaryLight,
    secondary: colors.secondaryLight,
    warning: colors.warningLight,
    success: colors.successLight,
  }[accent];

  return (
    <AppCard style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: accentBackground }]}>
        <AppText size={FONT_SIZE.xl} accessibilityLabel={title}>
          {icon}
        </AppText>
      </View>
      <View style={styles.copy}>
        <AppText size={FONT_SIZE.md} bold color={colors.text}>
          {title}
        </AppText>
        <AppText size={FONT_SIZE.sm} color={colors.textMuted} style={styles.description}>
          {description}
        </AppText>
        {detail ? (
          <AppText size={FONT_SIZE.xs} bold color={accentColor} style={styles.detail}>
            {detail}
          </AppText>
        ) : null}
      </View>
    </AppCard>
  );
}

const makeStyles = (colors: ReturnType<typeof useTheme>['colors']) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: RADIUS.lg,
      padding: SPACING.md,
      gap: SPACING.md,
    },
    iconWrap: {
      width: 54,
      height: 54,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },
    copy: {
      flex: 1,
      gap: 4,
    },
    description: {
      lineHeight: 21,
    },
    detail: {
      marginTop: 2,
    },
  });
