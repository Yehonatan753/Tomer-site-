import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { Typography } from '../constants/typography';
import { Strings } from '../constants/strings';

interface MacroBarProps {
  label: string;
  consumed: number;
  total: number;
  color: string;
}

export default function MacroBar({ label, consumed, total, color }: MacroBarProps) {
  const percentage = Math.min((consumed / total) * 100, 100);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(percentage, {
      duration: 1000,
      easing: Easing.out(Easing.cubic),
    });
  }, [percentage]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
    };
  });

  return (
    <View style={{ marginBottom: 16 }}>
      <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text style={[Typography.bodyBold, { color: '#FFF' }]}>{label}</Text>
        <Text style={[Typography.caption, { color: '#A1A1AA' }]}>
          {consumed} / {total} {Strings.grams}
        </Text>
      </View>
      <View style={{ height: 6, backgroundColor: '#222', borderRadius: 999, overflow: 'hidden' }}>
        <Animated.View
          style={[
            { height: '100%', backgroundColor: color, borderRadius: 999 },
            animatedStyle,
          ]}
        />
      </View>
    </View>
  );
}
