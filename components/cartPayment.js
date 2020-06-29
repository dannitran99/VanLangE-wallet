import * as React from 'react';
import {StyleSheet,Image, Text, View ,TouchableOpacity} from 'react-native'
import NumberFormat from 'react-number-format';
import Icon from 'react-native-vector-icons/FontAwesome';
function CartPayment(props) {
  const{cartItem,onPressAdd,onPressMinus} = props;
  return (

       <View style={styles.container}>
            <Text style={styles.text}>{cartItem.name}</Text>
            <View style={{flexDirection:"row"}}>
              {cartItem.amount == 0? undefined:(<TouchableOpacity onPress={onPressMinus}>
                <Icon  name="chevron-left"size={20}  color='#4388D6'/>
              </TouchableOpacity>)}
              <Text style={{ marginHorizontal:5}}>{cartItem.amount}</Text>
              <TouchableOpacity onPress={onPressAdd}>
                <Icon  name="chevron-right"size={20}  color='#4388D6'/>
              </TouchableOpacity>
            </View>
            <View style={styles.priceText}>
              <NumberFormat
                 value={cartItem.price}
                 displayType={'text'}
                 thousandSeparator={true}
                 suffix={' ₫'}
                 renderText={formattedValue => <Text style={{fontWeight:'bold'}}>{formattedValue}</Text>} // <--- Don't forget this!
               />
            </View>
       </View>

  );
}


const styles = StyleSheet.create({
    container:{
      alignItems:'center',
      margin:10,
      marginHorizontal:20,
      flexDirection:"row",
      justifyContent:"space-between"
    },
    text:{
      flex:1,
      fontWeight:'bold',
      fontSize:17
    },
    priceText:{
      alignItems:'flex-end',
      width:100
    }
});

export default CartPayment;
