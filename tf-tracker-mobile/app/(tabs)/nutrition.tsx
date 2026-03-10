import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../lib/auth';
import { isPremium } from '../../lib/subscription';
import MealCard from '../../components/MealCard';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Strings } from '../../constants/strings';

// Mock Data
const MOCK_MEALS = [
  {
    id: '1',
    mealType: Strings.breakfast,
    time: '08:00',
    name: 'שיבולת שועל וחלבון',
    calories: 350,
    protein: 30,
    carbs: 45,
    fat: 8,
    items: [
      { id: '1a', food_name: 'שיבולת שועל', quantity: 50, unit: 'גרם', calories: 190 },
      { id: '1b', food_name: 'אבקת חלבון מי גבינה', quantity: 30, unit: 'גרם', calories: 120 },
      { id: '1c', food_name: 'חלב שקדים', quantity: 200, unit: 'מ"ל', calories: 40 },
    ]
  },
  {
    id: '2',
    mealType: Strings.lunch,
    time: '13:30',
    name: 'חזה עוף ואורז',
    calories: 450,
    protein: 40,
    carbs: 50,
    fat: 10,
    items: [
      { id: '2a', food_name: 'חזה עוף צלוי', quantity: 150, unit: 'גרם', calories: 240 },
      { id: '2b', food_name: 'אורז בסמטי מבושל', quantity: 150, unit: 'גרם', calories: 190 },
      { id: '2c', food_name: 'שמן זית', quantity: 1, unit: 'כפית', calories: 40 },
    ]
  }
];

export default function NutritionScreen() {
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
        <Text style={[Typography.h2, { color: Colors.textMain, textAlign: 'right' }]}>{Strings.todaysMealPlan}</Text>
        <Text style={[Typography.body, { color: Colors.textMuted, textAlign: 'right' }]}>{new Date().toLocaleDateString('he-IL')}</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        {MOCK_MEALS.map((meal) => (
          <MealCard
            key={meal.id}
            mealType={meal.mealType}
            time={meal.time}
            name={meal.name}
            calories={meal.calories}
            protein={meal.protein}
            carbs={meal.carbs}
            fat={meal.fat}
            items={meal.items}
            isPremium={false}
            hasAccess={true}
          />
        ))}

        <View style={{ flexDirection: 'row-reverse', gap: 12, marginTop: 16 }}>
          <TouchableOpacity style={{ flex: 1, backgroundColor: Colors.surface, borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: Colors.borderLight }}>
            <Ionicons name="calculator" size={24} color={Colors.energy} style={{ marginBottom: 8 }} />
            <Text style={[Typography.bodyBold, { color: Colors.textMain, textAlign: 'center' }]}>{Strings.calorieCalculator}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, backgroundColor: Colors.surface, borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: Colors.borderLight }}>
            <Ionicons name="restaurant" size={24} color={Colors.energy} style={{ marginBottom: 8 }} />
            <Text style={[Typography.bodyBold, { color: Colors.textMain, textAlign: 'center' }]}>{Strings.recipes}</Text>
            {!hasPremium && <Ionicons name="lock-closed" size={12} color={Colors.textMuted} style={{ position: 'absolute', top: 12, left: 12 }} />}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
