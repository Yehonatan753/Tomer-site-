import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Strings } from '../constants/strings';

const { width } = Dimensions.get('window');

const PAGES = [
  {
    title: Strings.onboarding1Title,
    subtitle: Strings.onboarding1Subtitle,
    icon: 'fitness-outline',
  },
  {
    title: Strings.onboarding2Title,
    subtitle: Strings.onboarding2Subtitle,
    icon: 'pie-chart-outline',
  },
  {
    title: Strings.onboarding3Title,
    subtitle: Strings.onboarding3Subtitle,
    icon: 'person-outline',
  }
];

export default function OnboardingScreen() {
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentPage < PAGES.length - 1) {
      setCurrentPage(prev => prev + 1);
    } else {
      router.replace('/(auth)/login');
    }
  };

  const handleSkip = () => {
    router.replace('/(auth)/login');
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 24, paddingTop: 60 }}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={[Typography.bodyBold, { color: Colors.textMuted }]}>{Strings.skip}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <Animated.View key={currentPage} entering={FadeIn} exiting={FadeOut} style={{ alignItems: 'center' }}>
          <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: Colors.energyDim, alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
            <Ionicons name={PAGES[currentPage].icon as any} size={60} color={Colors.energy} />
          </View>
          <Text style={[Typography.h2, { color: Colors.textMain, textAlign: 'center', marginBottom: 16 }]}>
            {PAGES[currentPage].title}
          </Text>
          <Text style={[Typography.body, { color: Colors.textMuted, textAlign: 'center', lineHeight: 24 }]}>
            {PAGES[currentPage].subtitle}
          </Text>
        </Animated.View>
      </View>

      <View style={{ padding: 32, paddingBottom: 48 }}>
        <View style={{ flexDirection: 'row-reverse', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
          {PAGES.map((_, index) => (
            <View 
              key={index} 
              style={{ 
                width: index === currentPage ? 24 : 8, 
                height: 8, 
                borderRadius: 4, 
                backgroundColor: index === currentPage ? Colors.energy : Colors.surfaceHover 
              }} 
            />
          ))}
        </View>
        
        <TouchableOpacity 
          onPress={handleNext}
          style={{ backgroundColor: Colors.energy, borderRadius: 999, paddingVertical: 16, alignItems: 'center', shadowColor: Colors.energy, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 10 }}
        >
          <Text style={[Typography.bodyBold, { color: '#FFF' }]}>
            {currentPage === PAGES.length - 1 ? Strings.getStarted : Strings.next}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
