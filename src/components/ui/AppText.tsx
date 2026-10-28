import React from 'react';
import {
    StyleSheet,
    Text,
    TextProps,
} from 'react-native';

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  size?: number;
  bold?: boolean;
  color?: string;
}

export const AppText = ({
  children,
  size = 16,
  bold = false,
  color = '#30434A',
  style,
  ...props
}: AppTextProps) => {
  return (
    <Text
      {...props}
      style={[
        styles.text,
        {
          fontSize: size,
          fontWeight: bold ? '700' : '400',
          color,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'System',
  },
});