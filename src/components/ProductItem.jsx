import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice'
// import { db } from '../db/db' 

export default function ProductItem({ product }) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [pressed, setPressed] = useState(false)

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    // db.transaction(tx => {
    //   tx.executeSql(
    //     `INSERT INTO cart_history (name, price, addedAt) VALUES (?, ?, ?);`,
    //     [
    //       product.title,
    //       product.price,
    //       new Date().toISOString()
    //     ],
    //     () => {},
    //     (txObj, error) => { console.log('Error al guardar en historial', error) }
    //   )
    // })
  }

  return (
    <Pressable onPress={() => navigation.navigate('ProductDetail', { product })}>
      <View style={styles.card}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price.toLocaleString()}</Text>

          <Pressable
            onPress={handleAddToCart}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            style={[styles.button, pressed && styles.buttonPressed]}
          >
            <Text style={styles.buttonText}>Agregar al carrito</Text>
          </Pressable>

        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    height: 100,
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
    color: 'gray',
    marginTop: 4,
    marginBottom: 6,
  },
  button: {
    backgroundColor: '#145C9E',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  buttonPressed: {
    backgroundColor: '#0F4374',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    transform: [{ scale: 0.96 }],
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
})

