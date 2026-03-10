import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../lib/auth';
import CalorieRing from '../../components/CalorieRing';
import MacroBar from '../../components/MacroBar';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Strings } from '../../constants/strings';

export default function DashboardScreen() {
  const { profile } = useAuth();
  const router = useRouter();

  // Mock data for display
  const caloriesTarget = profile?.daily_calories_target || 2000;
  const caloriesConsumed = 1250;
  const proteinTarget = profile?.protein_target_g || 150;
  const carbsTarget = profile?.carbs_target_g || 200;
  const fatTarget = profile?.fat_target_g || 70;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.bg }} contentContainerStyle={{ padding: 24, paddingTop: 60, paddingBottom: 100 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <View>
          <Text style={[Typography.h2, { color: Colors.textMain, textAlign: 'right' }]}>{Strings.greeting} {profile?.full_name?.split(' ')[0]}</Text>
          <Text style={[Typography.label, { color: Colors.energy, textAlign: 'right', marginTop: 4 }]}>TF TRACKER</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <View style={{ width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: Colors.energy, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.surfaceLight }}>
            {profile?.avatar_url ? (
              <Image source={{ uri: profile.avatar_url }} style={{ width: '100%', height: '100%' }} />
            ) : (
              <Ionicons name="person" size={24} color={Colors.textMuted} />
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Calorie Ring Card */}
      <View style={{ backgroundColor: Colors.surface, borderRadius: 24, padding: 24, marginBottom: 16, borderWidth: 1, borderColor: Colors.borderLight, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <Text style={[Typography.body, { color: Colors.textMuted, textAlign: 'right', marginBottom: 8 }]}>{Strings.caloriesRemaining}</Text>
          <Text style={[Typography.h1, { color: Colors.textMain, textAlign: 'right' }]}>{caloriesTarget - caloriesConsumed}</Text>
          <Text style={[Typography.caption, { color: Colors.textMuted, textAlign: 'right' }]}>{Strings.outOf} {caloriesTarget} {Strings.kcal}</Text>
        </View>
        <CalorieRing consumed={caloriesConsumed} total={caloriesTarget} size={100} strokeWidth={10} />
      </View>

      {/* Macro Targets Card */}
      <View style={{ backgroundColor: Colors.surface, borderRadius: 24, padding: 24, marginBottom: 16, borderWidth: 1, borderColor: Colors.borderLight }}>
        <Text style={[Typography.h3, { color: Colors.textMain, textAlign: 'right', marginBottom: 20 }]}>{Strings.dailyTargets}</Text>
        <MacroBar label={Strings.protein} consumed={85} total={proteinTarget} color={Colors.energy} />
        <MacroBar label={Strings.carbs} consumed={120} total={carbsTarget} color="#FFFFFF" />
        <MacroBar label={Strings.fat} consumed={45} total={fatTarget} color="rgba(255,255,255,0.6)" />
      </View>

      {/* Next Meal Card */}
      <TouchableOpacity 
        onPress={() => router.push('/(tabs)/nutrition')}
        style={{ backgroundColor: Colors.surface, borderRadius: 24, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: Colors.energy, overflow: 'hidden' }}
      >
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: Colors.energyDim }} />
        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Text style={[Typography.label, { color: Colors.energy }]}>{Strings.nextMeal}</Text>
          <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
            <Text style={[Typography.caption, { color: Colors.textMain }]}>13:30</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 16 }}>
          <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,77,0,0.2)', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="restaurant" size={24} color={Colors.energy} />
          </View>
          <View>
            <Text style={[Typography.h3, { color: Colors.textMain, textAlign: 'right' }]}>חזה עוף ואורז</Text>
            <Text style={[Typography.body, { color: Colors.textMuted, textAlign: 'right' }]}>450 קק"ל • 40ג חלבון</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Planned Workout Card */}
      <TouchableOpacity 
        onPress={() => router.push('/(tabs)/workout')}
        style={{ backgroundColor: Colors.surface, borderRadius: 24, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: Colors.borderLight }}
      >
        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Text style={[Typography.label, { color: Colors.textMuted }]}>{Strings.plannedWorkout}</Text>
          <View style={{ backgroundColor: Colors.surfaceHover, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
            <Text style={[Typography.caption, { color: Colors.textMuted }]}>18:00</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 16 }}>
          <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: Colors.surfaceHover, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="barbell" size={24} color={Colors.textMain} />
          </View>
          <View>
            <Text style={[Typography.h3, { color: Colors.textMain, textAlign: 'right' }]}>אימון כוח: גב ויד קדמית</Text>
            <Text style={[Typography.body, { color: Colors.textMuted, textAlign: 'right' }]}>45 דקות • 6 תרגילים</Text>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
