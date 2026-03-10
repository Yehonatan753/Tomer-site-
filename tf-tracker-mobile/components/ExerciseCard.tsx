import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Strings } from '../constants/strings';

interface ExerciseCardProps {
  name: string;
  targetSets: number;
  targetReps: string;
  targetWeight?: number;
  restSeconds: number;
  hasVideo?: boolean;
  isPremium?: boolean;
  hasAccess?: boolean;
}

export default function ExerciseCard({
  name,
  targetSets,
  targetReps,
  targetWeight,
  restSeconds,
  hasVideo,
  isPremium,
  hasAccess,
}: ExerciseCardProps) {
  const [completedSets, setCompletedSets] = useState<number[]>([]);

  const toggleSet = (index: number) => {
    if (completedSets.includes(index)) {
      setCompletedSets(completedSets.filter(i => i !== index));
    } else {
      setCompletedSets([...completedSets, index]);
    }
  };

  return (
    <View style={{ backgroundColor: Colors.surface, borderRadius: 24, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: Colors.borderLight }}>
      <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <View style={{ flex: 1 }}>
          <Text style={[Typography.h3, { color: Colors.textMain, textAlign: 'right', marginBottom: 4 }]}>{name}</Text>
          <Text style={[Typography.body, { color: Colors.textMuted, textAlign: 'right' }]}>
            {targetSets} {Strings.sets} × {targetReps} {Strings.reps} {targetWeight ? `× ${targetWeight} ${Strings.kg}` : ''}
          </Text>
          <Text style={[Typography.caption, { color: Colors.textMuted, textAlign: 'right', marginTop: 4 }]}>
            {restSeconds} {Strings.seconds} {Strings.rest}
          </Text>
        </View>
        {hasVideo && (
          <TouchableOpacity style={{ backgroundColor: Colors.surfaceHover, padding: 8, borderRadius: 12 }}>
            <Ionicons name={isPremium && !hasAccess ? "lock-closed" : "play"} size={20} color={Colors.energy} />
          </TouchableOpacity>
        )}
      </View>

      <View style={{ gap: 8 }}>
        {Array.from({ length: targetSets }).map((_, index) => {
          const isCompleted = completedSets.includes(index);
          return (
            <View key={index} style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 12 }}>
              <View style={{ width: 24, alignItems: 'center' }}>
                <Text style={[Typography.bodyBold, { color: Colors.textMuted }]}>{index + 1}</Text>
              </View>
              
              <View style={{ flex: 1, flexDirection: 'row-reverse', gap: 8 }}>
                <TextInput
                  placeholder={targetReps}
                  placeholderTextColor={Colors.textMuted}
                  keyboardType="numeric"
                  style={[
                    Typography.body,
                    { flex: 1, backgroundColor: Colors.surfaceLight, borderRadius: 12, padding: 12, color: Colors.textMain, textAlign: 'center' },
                    isCompleted && { opacity: 0.5 }
                  ]}
                  editable={!isCompleted}
                />
                <TextInput
                  placeholder={targetWeight ? targetWeight.toString() : '-'}
                  placeholderTextColor={Colors.textMuted}
                  keyboardType="numeric"
                  style={[
                    Typography.body,
                    { flex: 1, backgroundColor: Colors.surfaceLight, borderRadius: 12, padding: 12, color: Colors.textMain, textAlign: 'center' },
                    isCompleted && { opacity: 0.5 }
                  ]}
                  editable={!isCompleted}
                />
              </View>

              <TouchableOpacity 
                onPress={() => toggleSet(index)}
                style={{ 
                  width: 44, height: 44, borderRadius: 12, 
                  backgroundColor: isCompleted ? Colors.success : Colors.surfaceLight,
                  alignItems: 'center', justifyContent: 'center'
                }}
              >
                <Ionicons name="checkmark" size={24} color={isCompleted ? '#FFF' : Colors.textMuted} />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
}
