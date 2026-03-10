import React from 'react';
import { View, Text } from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';

interface ChatBubbleProps {
  content: string;
  isOwn: boolean;
  time: string;
}

export default function ChatBubble({ content, isOwn, time }: ChatBubbleProps) {
  return (
    <View style={{ 
      alignSelf: isOwn ? 'flex-end' : 'flex-start',
      maxWidth: '80%',
      marginBottom: 12,
    }}>
      <View style={{
        backgroundColor: isOwn ? Colors.energy : Colors.surfaceLight,
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: isOwn ? 20 : 4,
        borderBottomRightRadius: isOwn ? 4 : 20,
      }}>
        <Text style={[Typography.body, { color: '#FFF', textAlign: 'right' }]}>{content}</Text>
      </View>
      <Text style={[Typography.caption, { color: Colors.textMuted, marginTop: 4, alignSelf: isOwn ? 'flex-end' : 'flex-start' }]}>
        {time}
      </Text>
    </View>
  );
}
