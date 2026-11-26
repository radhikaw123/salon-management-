import { useEffect, useState } from 'react';
import { Animated, Easing } from 'react-native';

// Animates a number from 0 up to `target`
export function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const anim = new Animated.Value(0);
    const id = anim.addListener(({ value: v }: { value: number }) => setValue(Math.round(v)));
    Animated.timing(anim, {
      toValue: target,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
    return () => anim.removeListener(id);
  }, [target, duration]);

  return value;
}