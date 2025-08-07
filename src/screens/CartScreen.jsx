import React from 'react'
import { View, Text, FlatList, Image, StyleSheet, Pressable } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, decreaseQuantity, addToCart, selectCartTotal } from '../features/cart/cartSlice'
import Header from '../components/Header'

export default function CartScreen() {
  const cartItems = useSelector(state => state.cart)
  const total = useSelector(selectCartTotal)
  const dispatch = useDispatch()

  const handleRemove = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id))
  }

  const handleIncrease = (product) => {
    dispatch(addToCart(product))
  }

  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>El carrito está vacío.</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price.toLocaleString()}</Text>
              <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>

              <View style={styles.buttonsRow}>
                <Pressable style={styles.qtyButton} onPress={() => handleDecrease(item.id)}>
                  <Text style={styles.qtyButtonText}>-</Text>
                </Pressable>
                <Pressable style={styles.qtyButton} onPress={() => handleIncrease(item)}>
                  <Text style={styles.qtyButtonText}>+</Text>
                </Pressable>
                <Pressable style={styles.removeButton} onPress={() => handleRemove(item.id)}>
                  <Text style={styles.removeButtonText}>Eliminar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${total.toLocaleString()}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginVertical: 6,
    marginHorizontal: 10,
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
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  price: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 4,
  },
  quantity: {
    fontSize: 14,
    marginVertical: 4,
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -40,
    marginLeft: 100,
    justifyContent: 'flex-end',
  },
  qtyButton: {
    backgroundColor: '#145C9E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 10,
  },
  qtyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  removeButton: {
    backgroundColor: '#D9565F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  totalContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#1F271B',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    color: 'white',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
})
