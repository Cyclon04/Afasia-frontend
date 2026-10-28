import { useMemo } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { FONT_SIZE, RADIUS, SPACING } from '../../styles/theme';
import { AppText } from './AppText';

interface Props {
  avatar: ImageSourcePropType;
  message: string;
  unread?: boolean;
}

export const NotificationItem = ({ avatar, message, unread = false }: Props) => {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={[styles.row, unread && styles.unreadRow]}>
      <View style={[styles.dot, unread ? styles.dotVisible : styles.dotHidden]} />
      <View style={styles.avatarWrapper}>
        <Image source={avatar} style={styles.avatar} resizeMode="cover" />
      </View>
      <AppText size={FONT_SIZE.md} color={colors.text} style={styles.message}>
        {message}
      </AppText>
    </View>
  );
};

const makeStyles = (colors: ReturnType<typeof useTheme>['colors']) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: SPACING.md,
      paddingHorizontal: SPACING.sm,
      gap: SPACING.md,
      borderRadius: RADIUS.md,
    },
    unreadRow: {
      backgroundColor: colors.primaryLight,
    },
    dot: {
      width: 9,
      height: 9,
      borderRadius: 5,
    },
    dotVisible: {
      backgroundColor: colors.secondaryDark,
    },
    dotHidden: {
      backgroundColor: 'transparent',
    },
    avatarWrapper: {
      width: 52,
      height: 52,
      borderRadius: 26,
      borderWidth: 2,
      borderColor: colors.primaryLight,
      overflow: 'hidden',
      backgroundColor: colors.surface,
    },
    avatar: {
      width: '100%',
      height: '100%',
    },
    message: {
      flex: 1,
      lineHeight: 23,
    },
  });
