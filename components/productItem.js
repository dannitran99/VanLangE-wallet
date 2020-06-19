import * as React from 'react';
import {StyleSheet,Image, Text, View ,TouchableOpacity} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import NumberFormat from 'react-number-format';
function ProductItem(props) {
  const{product} = props;
  return (

       <View style={styles.container}>
          <Text style={styles.textStyle}>{product.name}</Text>
          <Image style={styles.categoryImage} source={{uri:product.image}}/>
          <View style={{flex:1, flexDirection:"row",justifyContent:"space-between"}}>
            <NumberFormat
               value={product.price}
               displayType={'text'}
               thousandSeparator={true}
               suffix={' ₫'}
               renderText={formattedValue => <Text style={[styles.bottomDiv,styles.priceText]}>{formattedValue}</Text>} // <--- Don't forget this!
             />
            <TouchableOpacity style={styles.bottomDiv} onPress={props.onPress}>
                <Ionicons name='ios-create' size={30} />
            </TouchableOpacity>
          </View>
       </View>

  );
}


const styles = StyleSheet.create({
    container:{
      margin:10,
      padding:10,
      alignItems:'center',
      borderRadius:15,
      elevation:4   //only for android
    },
    textStyle:{
      fontSize:20,
      fontWeight:'bold',
      padding:10
    },
    categoryImage:{
      width:128,
      height:128
    },
    bottomDiv:{
      marginHorizontal:5,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    priceText:{
      flex:1,
      color:'#9DA9B2',
      textDecorationLine:'underline'
    }
});

export default ProductItem;
