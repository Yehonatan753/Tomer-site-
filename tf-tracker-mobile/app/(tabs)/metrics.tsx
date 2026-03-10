import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../lib/auth';
import { isPremium } from '../../lib/subscription';
import WeightChart from '../../components/WeightChart';
import PremiumGate from '../../components/PremiumGate';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Strings } from '../../constants/strings';

const TABS = [Strings.weightTracking, Strings.bodyFat, Strings.measurements, Strings.progressPhotos];

export default function MetricsScreen() {
  const { user } = useAuth();
  const [hasPremium, setHasPremium] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (user) {
      isPremium(user.id).then(setHasPremium);
    }
  }, [user]);

  const renderContent = () => {
    if (activeTab > 0 && !hasPremium) {
      return <PremiumGate title={TABS[activeTab]} />;
    }

    if (activeTab === 0) {
      return (
        <View style={{ padding: 24 }}>
          <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <Text style={[Typography.h3, { color: Colors.textMain }]}>התקדמות משקל</Text>
            <TouchableOpacity style={{ backgroundColor: Colors.surfaceHover, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 }}>
              <Text style={[Typography.caption, { color: Colors.textMain }]}>{Strings.lastMonth}</Text>
            </TouchableOpacity>
          </View>
          
          <WeightChart 
            labels={['1/3', '8/3', '15/3', '22/3', '29/3']} 
            data={[82.5, 81.8, 81.2, 80.5, 80.1]} 
          />

          <TouchableOpacity style={{ backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.borderLight, borderRadius: 16, padding: 16, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 24 }}>
            <Ionicons name="add" size={24} color={Colors.energy} />
            <Text style={[Typography.bodyBold, { color: Colors.textMain }]}>{Strings.addWeight}</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={{ padding: 24, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text style={[Typography.body, { color: Colors.textMuted }]}>תוכן זמין בקרוב...</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg }}>
      <View style={{ paddingTop: 60, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: Colors.borderLight }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, gap: 16, flexDirection: 'row-reverse' }}>
          {TABS.map((tab, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => setActiveTab(index)}
              style={{ 
                paddingVertical: 8, 
                paddingHorizontal: 16, 
                borderRadius: 999, 
                backgroundColor: activeTab === index ? Colors.energy : Colors.surface,
                borderWidth: 1,
                borderColor: activeTab === index ? Colors.energy : Colors.borderLight
              }}
            >
              <Text style={[Typography.bodyBold, { color: activeTab === index ? '#FFF' : Colors.textMuted }]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100, flexGrow: 1 }}>
        {renderContent()}
      </ScrollView>
    </View>
  );
}
