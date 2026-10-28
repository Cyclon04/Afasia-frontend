// src/components/ui/IconButton.tsx
import {
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle,
} from 'react-native';
import { useMemo } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { RADIUS } from '../../styles/theme';

interface Props extends TouchableOpacityProps {
  /** Ícono como emoji o componente */
  icon: React.ReactNode;
  /** Callback opcional (si no usas navegación) */
  onPress?: () => void;
  style?: ViewStyle;
  /** Tamaño del área táctil */
  size?: number;
}

export const IconButton = ({
  icon,
  onPress,
  style,
  size = 44,
  ...props
}: Props) => {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.button,
        { width: size, height: size },
        style,
      ]}
    >
      {icon}
    </TouchableOpacity>
  );
};

const makeStyles = (colors: ReturnType<typeof useTheme>['colors']) =>
  StyleSheet.create({
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: RADIUS.pill,
      backgroundColor: colors.surfaceAlt,
    },
  });