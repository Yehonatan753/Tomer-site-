import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Strings } from '../constants/strings';

export default function SettingsScreen() {
  const { profile } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/(auth)/login');
  };

  const SettingItem = ({ icon, title, value, isDestructive = false }: any) => (
    <TouchableOpacity style={{ flexDirection: 'row-reverse', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: Colors.borderLight }}>
      <Ionicons name={icon} size={24} color={isDestructive ? Colors.error : Colors.textMuted} />
      <Text style={[Typography.body, { color: isDestructive ? Colors.error : Colors.textMain, flex: 1, textAlign: 'right', marginRight: 16 }]}>{title}</Text>
      {value ? (
        <Text style={[Typography.caption, { color: Colors.textMuted }]}>{value}</Text>
      ) : (
        <Ionicons name="chevron-back" size={20} color={Colors.textMuted} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg }}>
      <View style={{ flexDirection: 'row-reverse', alignItems: 'center', padding: 24, paddingTop: 60, borderBottomWidth: 1, borderBottomColor: Colors.borderLight }}>
        <TouchableOpacity onPress={() => router.back()} style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="close" size={28} color={Colors.textMain} />
        </TouchableOpacity>
        <Text style={[Typography.h2, { color: Colors.textMain, flex: 1, textAlign: 'right' }]}>{Strings.settings}</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: Colors.surfaceLight, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Ionicons name="person" size={40} color={Colors.textMuted} />
          </View>
          <Text style={[Typography.h2, { color: Colors.textMain }]}>{profile?.full_name || 'משתמש'}</Text>
          <Text style={[Typography.body, { color: Colors.textMuted }]}>{profile?.email}</Text>
        </View>

        <View style={{ backgroundColor: Colors.surface, borderRadius: 24, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: Colors.borderLight }}>
          <SettingItem icon="person-outline" title={Strings.profile} />
          <SettingItem icon="notifications-outline" title={Strings.notifications} />
          <SettingItem icon="star-outline" title={Strings.subscription} value={profile?.role === 'premium' ? Strings.premiumPlan : Strings.freePlan} />
          <SettingItem icon="information-circle-outline" title={Strings.about} />
        </View>

        <View style={{ backgroundColor: Colors.surface, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: Colors.borderLight }}>
          <TouchableOpacity onPress={handleLogout} style={{ flexDirection: 'row-reverse', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: Colors.borderLight }}>
            <Ionicons name="log-out-outline" size={24} color={Colors.textMain} />
            <Text style={[Typography.body, { color: Colors.textMain, flex: 1, textAlign: 'right', marginRight: 16 }]}>{Strings.logout}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row-reverse', alignItems: 'center', paddingVertical: 16 }}>
            <Ionicons name="trash-outline" size={24} color={Colors.error} />
            <Text style={[Typography.body, { color: Colors.error, flex: 1, textAlign: 'right', marginRight: 16 }]}>{Strings.deleteAccount}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
