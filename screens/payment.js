import React from 'react';
import { StyleSheet,FlatList,Text,View,TouchableOpacity } from 'react-native';
import NumberFormat from 'react-number-format';
function Payment({navigation,route}) {
  const [price, setPrice] = React.useState(route.params.price);

  return (
    <View style={styles.container}>
      <View style={{flex:1}}>
        <View style={styles.header}>
         <Text style={styles.titleHeader}>Tóm tắt đơn hàng</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={{flexDirection:"row",alignItems:'center'}}>
            <Text style={styles.sumText}>Tổng cộng</Text>
            <NumberFormat
               value={price}
               displayType={'text'}
               thousandSeparator={true}
               suffix={' ₫'}
               renderText={formattedValue => <Text style={{fontSize:25,fontWeight:'bold'}}>{formattedValue}</Text>} // <--- Don't forget this!
             />
        </View>
        <TouchableOpacity style={styles.buttonPay}>
          <View style={{flex:1,alignItems:'center'}}>
            <Text style={{color:'#fff',fontWeight:'bold',fontSize:20}}>Thanh toán</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    marginVertical:10
  },
  header:{
    backgroundColor:'#dbdbdb',
    height:40,
    justifyContent:'center'
  },
  titleHeader:{
    paddingHorizontal:15,
    fontSize:20,
    color:'#6b6b6b'
  },
  footer:{
    alignItems:'center',
    padding:15,
    backgroundColor:'#fff'
  },
  sumText:{
    flex:1,
    fontSize:20,
    color:'#6b6b6b'
  },
  buttonPay:{
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center',
    height:50,
    backgroundColor:'#4388D6',
    flexDirection:"row",
    marginVertical:10
  }
});


export default Payment;
