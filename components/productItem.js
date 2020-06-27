import * as React from 'react';
import {StyleSheet,Image, Text, View ,TouchableOpacity} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import NumberFormat from 'react-number-format';
function ProductItem(props) {
  const{product} = props;
  return (

       <View style={styles.container}>
        <View style={styles.image}>
          <Image style={styles.categoryImage} source={{uri:product.image}}/>
        </View>
          <View style={{marginHorizontal:5}}>
            {product.name.length < 15 ?(<Text style={styles.textStyle}>{product.name}</Text>):
              (<Text style={styles.textStyle}>{product.name.substring(0,14) +'...'}</Text>)}
            <View style={{flexDirection:"row"}}>
            <NumberFormat
               value={product.price}
               displayType={'text'}
               thousandSeparator={true}
               suffix={' ₫'}
               renderText={formattedValue => <Text style={styles.priceText}>{formattedValue}</Text>} // <--- Don't forget this!
             />
             {product.available?(<Text>Còn hàng</Text>):(<Text>Hết hàng</Text>)}
             </View>
          </View>
          <TouchableOpacity style={styles.bottomDiv} onPress={props.onPress}>
            <View
              style={{
                borderBottomColor: '#cfcfcf',
                borderBottomWidth: 1,
              }}
            />
            <View style={{flexDirection:"row", alignItems:'center'}}>
              <Ionicons name='ios-create' size={30} color='#4388D6'/>
              <Text style={styles.botText}>  Chỉnh sửa</Text>
            </View>
          </TouchableOpacity>
       </View>

  );
}


const styles = StyleSheet.create({
    container:{
      margin:10,
      padding:10,
      borderRadius:15,
      elevation:4   //only for android
    },
    image:{
      padding:20,
      alignItems:'center'
    },
    textStyle:{
      fontSize:18,
      color:'#4388D6'
    },
    categoryImage:{
      width:128,
      height:128
    },
    priceText:{
      flex:1,
      fontWeight:'bold',
    },
    bottomDiv:{
      marginTop:15
    },
    botText:{
      color:'#4388D6'
    }
});

export default ProductItem;
