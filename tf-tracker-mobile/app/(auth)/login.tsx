import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Strings } from '../../constants/strings';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: Colors.bg }}>
      <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
        <View style={{ alignItems: 'center', marginBottom: 48 }}>
          <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.energyDim, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Text style={[Typography.h1, { color: Colors.energy }]}>TF</Text>
          </View>
          <Text style={[Typography.h2, { color: Colors.textMain }]}>{Strings.appName}</Text>
        </View>

        {error ? <Text style={[Typography.caption, { color: Colors.error, textAlign: 'right', marginBottom: 16 }]}>{error}</Text> : null}

        <View style={{ gap: 16, marginBottom: 24 }}>
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
          <TouchableOpacity>
            <Text style={[Typography.caption, { color: Colors.energy, textAlign: 'left' }]}>{Strings.forgotPassword}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          onPress={handleLogin} 
          disabled={loading}
          style={{ backgroundColor: Colors.energy, borderRadius: 999, paddingVertical: 16, alignItems: 'center', marginBottom: 32, shadowColor: Colors.energy, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 10 }}
        >
          {loading ? <ActivityIndicator color="#FFF" /> : <Text style={[Typography.bodyBold, { color: '#FFF' }]}>{Strings.login}</Text>}
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: Colors.borderMedium }} />
          <Text style={[Typography.caption, { color: Colors.textMuted, paddingHorizontal: 16 }]}>{Strings.or}</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: Colors.borderMedium }} />
        </View>

        <View style={{ gap: 16, marginBottom: 48 }}>
          <TouchableOpacity style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', gap: 12, borderWidth: 1, borderColor: Colors.borderMedium, borderRadius: 999, paddingVertical: 16 }}>
            <Ionicons name="logo-google" size={20} color={Colors.textMain} />
            <Text style={[Typography.bodyBold, { color: Colors.textMain }]}>{Strings.continueWithGoogle}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', gap: 12, borderWidth: 1, borderColor: Colors.borderMedium, borderRadius: 999, paddingVertical: 16 }}>
            <Ionicons name="logo-apple" size={20} color={Colors.textMain} />
            <Text style={[Typography.bodyBold, { color: Colors.textMain }]}>{Strings.continueWithApple}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row-reverse', justifyContent: 'center', gap: 8 }}>
          <Text style={[Typography.body, { color: Colors.textMuted }]}>{Strings.dontHaveAccount}</Text>
          <Link href="/register" asChild>
            <TouchableOpacity>
              <Text style={[Typography.bodyBold, { color: Colors.energy }]}>{Strings.signUp}</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
