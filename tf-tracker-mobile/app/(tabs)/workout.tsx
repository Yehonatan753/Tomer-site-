import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../lib/auth';
import { isPremium } from '../../lib/subscription';
import ExerciseCard from '../../components/ExerciseCard';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Strings } from '../../constants/strings';

const MOCK_EXERCISES = [
  {
    id: '1',
    name: 'פולי עליון באחיזה רחבה',
    targetSets: 3,
    targetReps: '10-12',
    targetWeight: 45,
    restSeconds: 60,
    hasVideo: true,
  },
  {
    id: '2',
    name: 'חתירה במשקולות בודדות',
    targetSets: 3,
    targetReps: '10',
    targetWeight: 20,
    restSeconds: 60,
    hasVideo: true,
  },
  {
    id: '3',
    name: 'כפיפת מרפקים בעמידה',
    targetSets: 4,
    targetReps: '12',
    targetWeight: 12,
    restSeconds: 45,
    hasVideo: true,
  }
];

export default function WorkoutScreen() {
  const { user } = useAuth();
  const [hasPremium, setHasPremium] = useState(false);

  useEffect(() => {
    if (user) {
      isPremium(user.id).then(setHasPremium);
    }
  }, [user]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg }}>
      <View style={{ padding: 24, paddingTop: 60, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: Colors.borderLight }}>
        <Text style={[Typography.h2, { color: Colors.textMain, textAlign: 'right' }]}>{Strings.todaysWorkout}</Text>
        <Text style={[Typography.body, { color: Colors.textMuted, textAlign: 'right' }]}>אימון כוח: גב ויד קדמית • 45 דקות</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 120 }}>
        {MOCK_EXERCISES.map((ex) => (
          <ExerciseCard
            key={ex.id}
            name={ex.name}
            targetSets={ex.targetSets}
            targetReps={ex.targetReps}
            targetWeight={ex.targetWeight}
            restSeconds={ex.restSeconds}
            hasVideo={ex.hasVideo}
            isPremium={true}
            hasAccess={hasPremium}
          />
        ))}
      </ScrollView>

      <View style={{ position: 'absolute', bottom: 90, left: 24, right: 24 }}>
        <TouchableOpacity style={{ backgroundColor: Colors.energy, borderRadius: 999, paddingVertical: 16, alignItems: 'center', shadowColor: Colors.energy, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 10 }}>
          <Text style={[Typography.bodyBold, { color: '#FFF' }]}>{Strings.startWorkout}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
