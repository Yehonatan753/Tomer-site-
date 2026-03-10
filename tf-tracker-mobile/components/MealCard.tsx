import React, { useState } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Strings } from '../constants/strings';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface MealItem {
  id: string;
  food_name: string;
  quantity: number;
  unit: string;
  calories: number;
}

interface MealCardProps {
  mealType: string;
  time: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  items: MealItem[];
  isPremium?: boolean;
  hasAccess?: boolean;
}

export default function MealCard({
  mealType,
  time,
  name,
  calories,
  protein,
  carbs,
  fat,
  items,
  isPremium = false,
  hasAccess = true,
}: MealCardProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={{ backgroundColor: Colors.surface, borderRadius: 24, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: Colors.borderLight }}>
      <TouchableOpacity onPress={toggleExpand} activeOpacity={0.8}>
        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 8 }}>
            <Text style={[Typography.label, { color: Colors.energy }]}>{mealType}</Text>
            <View style={{ backgroundColor: Colors.surfaceHover, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
              <Text style={[Typography.caption, { color: Colors.textMuted }]}>{time}</Text>
            </View>
          </View>
          {isPremium && !hasAccess && (
            <Ionicons name="lock-closed" size={16} color={Colors.textMuted} />
          )}
        </View>

        <Text style={[Typography.h3, { color: Colors.textMain, marginBottom: 8, textAlign: 'right' }]}>{name}</Text>

        <View style={{ flexDirection: 'row-reverse', gap: 16 }}>
          <Text style={[Typography.body, { color: Colors.textMuted }]}>{calories} {Strings.kcal}</Text>
          <Text style={[Typography.body, { color: Colors.textMuted }]}>{Strings.protein}: {protein}g</Text>
          <Text style={[Typography.body, { color: Colors.textMuted }]}>{Strings.carbs}: {carbs}g</Text>
          <Text style={[Typography.body, { color: Colors.textMuted }]}>{Strings.fat}: {fat}g</Text>
        </View>
      </TouchableOpacity>

      {expanded && hasAccess && (
        <View style={{ marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: Colors.borderLight }}>
          {items.map((item) => (
            <View key={item.id} style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <View>
                <Text style={[Typography.bodyBold, { color: Colors.textMain, textAlign: 'right' }]}>{item.food_name}</Text>
                <Text style={[Typography.caption, { color: Colors.textMuted, textAlign: 'right' }]}>{item.quantity} {item.unit}</Text>
              </View>
              <TouchableOpacity style={{ borderWidth: 1, borderColor: Colors.borderMedium, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 }}>
                <Text style={[Typography.caption, { color: Colors.textMain }]}>{Strings.alternatives}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
