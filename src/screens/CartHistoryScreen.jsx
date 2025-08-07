// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList } from 'react-native';
// import { db } from '../database/db';

// const CartHistoryScreen = () => {
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'SELECT * FROM cart_history ORDER BY addedAt DESC;',
//         [],
//         (_, { rows }) => setHistory(rows._array)
//       );
//     });
//   }, []);

//   return (
//     <View>
//       <Text>Historial de agregados al carrito</Text>
//       <FlatList
//         data={history}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({ item }) => (
//           <Text>{item.name} - ${item.price} - {item.addedAt}</Text>
//         )}
//       />
//     </View>
//   );
// };

// export default CartHistoryScreen;
