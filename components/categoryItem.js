import * as React from 'react';
import {StyleSheet,Image, Text, View ,TouchableOpacity} from 'react-native'


function CategoryItem(props) {
  const{category,onPress} = props;
  return (
    <TouchableOpacity onPress={onPress}>
       <View style={styles.container}>
          <Text style={styles.textStyle}>{category.name}</Text>
          <Image style={styles.categoryImage} source={category.image}/>
       </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
    container:{
      margin:10,
      marginHorizontal:25,
      alignItems:'center',
      padding:10,
      borderRadius:15,
      elevation:4   //only for android
    },
    textStyle:{
      fontSize:20,
      fontWeight:'bold',
      padding:10
    },
    categoryImage:{
      width:64,
      height:64
    }

});

export default CategoryItem;
