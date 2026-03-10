import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../lib/auth';
import { isPremium } from '../../lib/subscription';
import ChatBubble from '../../components/ChatBubble';
import PremiumGate from '../../components/PremiumGate';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Strings } from '../../constants/strings';

export default function ChatScreen() {
  const { user } = useAuth();
  const [hasPremium, setHasPremium] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      isPremium(user.id).then(setHasPremium);
    }
  }, [user]);

  if (!hasPremium) {
    return <PremiumGate title={Strings.tabChat} />;
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: Colors.bg }}>
      <View style={{ padding: 24, paddingTop: 60, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: Colors.borderLight, flexDirection: 'row-reverse', alignItems: 'center', gap: 12 }}>
        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.surfaceLight, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="person" size={20} color={Colors.textMuted} />
        </View>
        <View>
          <Text style={[Typography.h3, { color: Colors.textMain, textAlign: 'right' }]}>תומר פרידמן</Text>
          <Text style={[Typography.caption, { color: Colors.success, textAlign: 'right' }]}>{Strings.online}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        <ChatBubble content="היי! איך הולך עם התפריט החדש?" isOwn={false} time="10:30" />
        <ChatBubble content="מעולה, ממש קל לי לעמוד בו. השייק בבוקר מושלם." isOwn={true} time="10:35" />
        <ChatBubble content="שמח לשמוע! אל תשכח לשתות לפחות 2.5 ליטר מים היום." isOwn={false} time="10:36" />
      </ScrollView>

      <View style={{ padding: 16, paddingBottom: Platform.OS === 'ios' ? 100 : 90, backgroundColor: Colors.surface, borderTopWidth: 1, borderTopColor: Colors.borderLight, flexDirection: 'row-reverse', alignItems: 'center', gap: 12 }}>
        <TouchableOpacity style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.surfaceLight, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="image-outline" size={24} color={Colors.textMuted} />
        </TouchableOpacity>
        <TextInput
          placeholder={Strings.typeMessage}
          placeholderTextColor={Colors.textMuted}
          value={message}
          onChangeText={setMessage}
          style={[Typography.body, { flex: 1, backgroundColor: Colors.surfaceLight, borderRadius: 22, paddingHorizontal: 16, paddingVertical: 12, color: Colors.textMain, textAlign: 'right', maxHeight: 100 }]}
          multiline
        />
        <TouchableOpacity style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.energy, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="send" size={20} color="#FFF" style={{ marginLeft: -4 }} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
