// src/components/character/FloatingCharacter.tsx
import { useEffect, useRef } from 'react';
import { Animated, Easing, ImageSourcePropType, StyleSheet } from 'react-native';

interface Props {
  source: ImageSourcePropType;
  size: number;
  /** Duración de un ciclo completo (subir + bajar) en ms */
  duration?: number;
  /** Cuántos píxeles sube/baja */
  floatDistance?: number;
  /** Cuánto crece/decrece (1 = sin cambio, 1.05 = 5% más grande) */
  scaleRange?: number;
}

export function FloatingCharacter({
  source,
  size,
  duration = 3000,
  floatDistance = 15,
  scaleRange = 1.05,
}: Props) {
  // Valor animado de 0 a 1 (ida y vuelta)
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: duration / 2,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: duration / 2,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [progress, duration]);

  // Interpolaciones
  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -floatDistance], // sube hacia arriba
  });

  const scale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, scaleRange], // crece hasta scaleRange
  });

  return (
    <Animated.Image
      source={source}
      style={[
        styles.image,
        {
          width: size,
          height: size,
          transform: [{ translateY }, { scale }],
        },
      ]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  image: {
    shadowColor: '#30434A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.09,
    shadowRadius: 10,
    elevation: 2,
  },
});