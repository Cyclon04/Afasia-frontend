// src/components/ui/AppCard.tsx
import { useMemo } from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { createGlobalStyles } from '../../styles/globalStyles';

interface Props extends ViewProps {
  children: React.ReactNode;
}

export const AppCard = ({ children, style, ...props }: Props) => {
  const { colors } = useTheme();
  const globalStyles = useMemo(() => createGlobalStyles(colors), [colors]);

  return (
    <View {...props} style={[globalStyles.card, style]}>
      {children}
    </View>
  );
};