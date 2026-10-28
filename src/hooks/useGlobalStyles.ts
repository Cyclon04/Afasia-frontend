// src/hooks/useGlobalStyles.ts
import { useMemo } from 'react';
import { createGlobalStyles } from '../styles/globalStyles';
import { useTheme } from './useTheme';

export function useGlobalStyles() {
  const { colors } = useTheme();
  return useMemo(() => createGlobalStyles(colors), [colors]);
}