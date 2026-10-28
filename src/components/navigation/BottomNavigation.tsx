import { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { RADIUS, SPACING } from '../../styles/theme';
import { AppText } from '../ui/AppText';

interface BottomNavigationProps {
  active?: 'notifications' | 'profile' | 'messages';
  onNotificationsPress?: () => void;
  onProfilePress?: () => void;
  onMessagesPress?: () => void;
}

export const BottomNavigation = ({
  active = 'profile',
  onNotificationsPress,
  onProfilePress,
  onMessagesPress,
}: BottomNavigationProps) => {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const items = [
    { key: 'notifications' as const, icon: '♧', label: 'Avisos', onPress: onNotificationsPress },
    { key: 'profile' as const, icon: '♙', label: 'Perfil', onPress: onProfilePress },
    { key: 'messages' as const, icon: '☺', label: 'Mensajes', onPress: onMessagesPress },
  ];

  return (
    <View style={styles.container}>
      {items.map((item) => {
        const selected = active === item.key;
        return (
          <TouchableOpacity
            key={item.key}
            style={[styles.item, selected && styles.activeItem]}
            onPress={item.onPress}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            accessibilityState={{ selected }}
          >
            <AppText
              size={22}
              bold={selected}
              color={selected ? colors.primaryDark : colors.textMuted}
            >
              {item.icon}
            </AppText>
            <AppText
              size={12}
              bold={selected}
              color={selected ? colors.primaryDark : colors.textMuted}
            >
              {item.label}
            </AppText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const makeStyles = (colors: ReturnType<typeof useTheme>['colors']) =>
  StyleSheet.create({
    container: {
      minHeight: 70,
      borderTopWidth: 1,
      borderTopColor: colors.borderLight,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: colors.surface,
      paddingHorizontal: SPACING.sm,
    },
    item: {
      minWidth: 76,
      minHeight: 56,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      borderRadius: RADIUS.md,
    },
    activeItem: {
      backgroundColor: colors.primaryLight,
    },
  });
