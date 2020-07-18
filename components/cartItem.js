import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import NumberFormat from 'react-number-format';
const CartItem = (props) => {
    const { data } = props;
    return (
      <View style={styles.panelCart}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 17 }}>{data.amount}x</Text>
          </View>
          <View style={{  paddingHorizontal: 25 }}>
              <Text numberOfLines={3} style={{  fontSize: 17, fontWeight: 'bold' }}>{data.name}</Text>
          </View>
          <View>
              <NumberFormat
                 value={data.price}
                 displayType={'text'}
                 thousandSeparator={true}
                 suffix={' ₫'}
                 renderText={formattedValue => <Text style={{ fontSize: 17 }}>{formattedValue}</Text>} // <--- Don't forget this!
               />
          </View>
      </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
  panelCart: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 12,
      marginTop: 12,
  }
})
