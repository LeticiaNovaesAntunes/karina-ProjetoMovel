import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Header({ title, navigation }: any) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <View style={{ width: 26 }} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: "#F83A7F",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    elevation: 3,
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
});
