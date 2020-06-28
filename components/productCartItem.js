import * as React from 'react';
import {StyleSheet,Image, Text, View ,TouchableOpacity} from 'react-native'
import NumberFormat from 'react-number-format';
import Icon from 'react-native-vector-icons/FontAwesome';
function ProductCartItem(props) {
  const{product,onPress} = props;
  return (

       <View style={styles.container}>
          <View style={{ flexDirection:"row",padding:5}}>
            <Image style={styles.categoryImage} source={{uri:product.image}}/>
              <View style={styles.info}>
                 <View style={{ flexDirection:"row",flex:1}}>
                    <View style={{flex:1}}>
                      <Text style={styles.textName}>{product.name}</Text>
                    </View>
                    <NumberFormat
                       value={product.price}
                       displayType={'text'}
                       thousandSeparator={true}
                       suffix={' ₫'}
                       renderText={formattedValue => <Text style={styles.priceText}>{formattedValue}</Text>} // <--- Don't forget this!
                     />
                  </View>
                <View style={{alignItems:'flex-end'}}>
                  <TouchableOpacity onPress={onPress}>
                    <Icon
                      name="plus-circle"
                      size={30}
                      color="#4388D6"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              </View>
          <View
            style={{
              paddingVertical:5,
              borderBottomColor: '#cfcfcf',
              borderBottomWidth: 1,
            }}
          />
       </View>

  );
}


const styles = StyleSheet.create({
    container:{
      margin:10,
    },
    categoryImage:{
      width:100,
      height:100,
      borderRadius:5
    },
    priceText:{
      fontWeight:'bold',
        fontSize:17
    },
    info:{
      flex:1,
      padding:5,
      marginLeft:10
    },
    textName:{
      fontSize:17
    }
});

export default ProductCartItem;
