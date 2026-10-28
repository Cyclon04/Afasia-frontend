import { ReactNode, useMemo } from 'react';
import {
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { FONT_SIZE, RADIUS, SPACING } from '../../styles/theme';
import { AppText } from './AppText';

interface Props {
  label: string;
  icon?: ReactNode;
  onPress?: () => void;
  showChevron?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  switchLabel?: string;
}

export const SettingRow = ({
  label,
  icon,
  onPress,
  showChevron = false,
  switchValue,
  onSwitchChange,
  switchLabel,
}: Props) => {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const isSwitch = typeof switchValue === 'boolean';

  const content = (
    <View style={styles.row}>
      <View style={styles.left}>
        <View style={styles.iconBox}>
          {icon ?? (
            <AppText size={FONT_SIZE.lg} color={colors.primaryDark} bold>
              ☆
            </AppText>
          )}
        </View>
        <AppText size={FONT_SIZE.md} color={colors.text} style={styles.label}>
          {label}
        </AppText>
      </View>

      <View style={styles.right}>
        {isSwitch ? (
          <View style={styles.switchWrapper}>
            <Switch
              value={switchValue}
              onValueChange={onSwitchChange}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={switchValue ? colors.primaryDark : colors.surface}
            />
            {switchLabel && (
              <AppText size={FONT_SIZE.xs} color={colors.textMuted}>
                {switchLabel}
              </AppText>
            )}
          </View>
        ) : showChevron ? (
          <AppText size={FONT_SIZE.lg} color={colors.textMuted} bold>
            ›
          </AppText>
        ) : null}
      </View>
    </View>
  );

  if (onPress && !isSwitch) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.72}
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const makeStyles = (colors: ReturnType<typeof useTheme>['colors']) =>
  StyleSheet.create({
    row: {
      minHeight: 56,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: SPACING.sm,
      paddingHorizontal: SPACING.sm,
      borderRadius: RADIUS.sm,
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.md,
      flexShrink: 1,
    },
    iconBox: {
      width: 34,
      height: 34,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primaryLight,
    },
    label: {
      flexShrink: 1,
    },
    right: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    switchWrapper: {
      alignItems: 'center',
      gap: 2,
    },
  });
