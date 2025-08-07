import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';

export default function ProductDetail({ route }) {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toLocaleString()}</Text>
        <Text style={styles.description}>{product.description || 'Sin descripción disponible.'}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  content: {
    padding: 16,
    paddingTop: 200,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderRadius: 18,
  },
  title: {
    fontSize: 24,
    fontFamily: 'RobotoSlab',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#888',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
  },
});
