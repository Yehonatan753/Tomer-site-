import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Colors } from '../constants/colors';

interface WeightChartProps {
  labels: string[];
  data: number[];
}

export default function WeightChart({ labels, data }: WeightChartProps) {
  return (
    <View style={{ alignItems: 'center', marginVertical: 16 }}>
      <LineChart
        data={{
          labels: labels.length ? labels : [''],
          datasets: [{ data: data.length ? data : [0] }]
        }}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          backgroundColor: Colors.surface,
          backgroundGradientFrom: Colors.surface,
          backgroundGradientTo: Colors.surface,
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 77, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(161, 161, 170, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: Colors.energy
          }
        }}
        bezier
        style={{ borderRadius: 16 }}
      />
    </View>
  );
}
