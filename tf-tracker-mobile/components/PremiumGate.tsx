import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Strings } from '../constants/strings';

interface PremiumGateProps {
  title?: string;
}

export default function PremiumGate({ title = Strings.premiumFeature }: PremiumGateProps) {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.energyDim, alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
        <Ionicons name="lock-closed" size={40} color={Colors.energy} />
      </View>
      <Text style={[Typography.h2, { color: Colors.textMain, textAlign: 'center', marginBottom: 12 }]}>
        {title}
      </Text>
      <Text style={[Typography.body, { color: Colors.textMuted, textAlign: 'center', marginBottom: 32 }]}>
        {Strings.upgradeToPremium}
      </Text>
      <TouchableOpacity style={{ backgroundColor: Colors.energy, paddingVertical: 16, paddingHorizontal: 32, borderRadius: 999, width: '100%', alignItems: 'center' }}>
        <Text style={[Typography.bodyBold, { color: '#FFF' }]}>{Strings.subscribe}</Text>
      </TouchableOpacity>
    </View>
  );
}
