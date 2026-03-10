import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Strings } from '../../constants/strings';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('הסיסמאות אינן תואמות');
      return;
    }
    setLoading(true);
    setError('');
    
    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: { full_name: fullName }
      }
    });
    
    if (error) setError(error.message);
    else router.replace('/(tabs)');
    
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: Colors.bg }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: 'center' }}>
        <View style={{ alignItems: 'center', marginBottom: 48, marginTop: 40 }}>
          <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.energyDim, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Text style={[Typography.h1, { color: Colors.energy }]}>TF</Text>
          </View>
          <Text style={[Typography.h2, { color: Colors.textMain }]}>{Strings.register}</Text>
        </View>

        {error ? <Text style={[Typography.caption, { color: Colors.error, textAlign: 'right', marginBottom: 16 }]}>{error}</Text> : null}

        <View style={{ gap: 16, marginBottom: 32 }}>
          <TextInput
            placeholder={Strings.fullName}
            placeholderTextColor={Colors.textMuted}
            value={fullName}
            onChangeText={setFullName}
            style={[Typography.body, { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.borderLight, borderRadius: 16, padding: 16, color: Colors.textMain, textAlign: 'right' }]}
          />
          <TextInput
            placeholder={Strings.email}
            placeholderTextColor={Colors.textMuted}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={[Typography.body, { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.borderLight, borderRadius: 16, padding: 16, color: Colors.textMain, textAlign: 'right' }]}
          />
          <TextInput
            placeholder={Strings.password}
            placeholderTextColor={Colors.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={[Typography.body, { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.borderLight, borderRadius: 16, padding: 16, color: Colors.textMain, textAlign: 'right' }]}
          />
          <TextInput
            placeholder={Strings.confirmPassword}
            placeholderTextColor={Colors.textMuted}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={[Typography.body, { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.borderLight, borderRadius: 16, padding: 16, color: Colors.textMain, textAlign: 'right' }]}
          />
        </View>

        <TouchableOpacity 
          onPress={handleRegister} 
          disabled={loading}
          style={{ backgroundColor: Colors.energy, borderRadius: 999, paddingVertical: 16, alignItems: 'center', marginBottom: 32, shadowColor: Colors.energy, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 10 }}
        >
          {loading ? <ActivityIndicator color="#FFF" /> : <Text style={[Typography.bodyBold, { color: '#FFF' }]}>{Strings.signUp}</Text>}
        </TouchableOpacity>

        <View style={{ flexDirection: 'row-reverse', justifyContent: 'center', gap: 8 }}>
          <Text style={[Typography.body, { color: Colors.textMuted }]}>{Strings.alreadyHaveAccount}</Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text style={[Typography.bodyBold, { color: Colors.energy }]}>{Strings.login}</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
