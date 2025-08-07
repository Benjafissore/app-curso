import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Header from '../components/Header';
import ProductItem from '../components/ProductItem';
import products from '../data/products.json';

export default function ProductList() {
  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductItem product={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
});
