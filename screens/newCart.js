import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button ,Alert} from 'react-native';
import {Dialog} from 'react-native-simple-dialogs';
import { CheckBox } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native'
export default function NewCart({navigation}) {
  const [dialogVisible, setDialogVisible] = React.useState(true);
  const [cart,setCart] = React.useState('');
  const [products,setProducts] = React.useState([]);
  const [load, setLoad] = React.useState(false);

  React.useEffect(() => {
    if(cart !== ''){
      setLoad(true);
      switch (cart) {
        case 'Market':
          axios.get('https://vlu-ewallet.herokuapp.com/market-manager/getData').then(res =>{
             setProducts(res.data);
             navigation.navigate('Giỏ hàng',{products:res.data});
             setLoad(false);
          }).catch(err =>{
               console.error(err);
          })
          break;
        case 'Canteen':
          setLoad(false);
          break;
        case 'Library':
          setLoad(false);
          break;
        default:break;

      }
    }
  }, [cart]);
  useFocusEffect(
    React.useCallback(() => {
      setDialogVisible(true);
    }, [])
  );

  return (

    <View
      style={styles.container}>
      <Dialog
          visible={dialogVisible}
          title="Tạo giỏ hàng cho">
          <View>
            <CheckBox
            title='Siêu thị'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={()=>{
              setDialogVisible(false);
              if(cart !== 'Market')setCart('Market')
              else navigation.navigate('Giỏ hàng',{products:products});}}
            />
            <CheckBox
            title='Căn tin'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={()=>{if(cart !== 'Canteen'){setCart('Canteen')}setDialogVisible(false);}}
            />
            <CheckBox
            title='Thư viện'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={()=>{if(cart !== 'Library'){setCart('Library')}setDialogVisible(false);}}
            />
          </View>
      </Dialog>
      {load ?(<LottieView style={{width:300}} source={require('../anim/413-shopping-basket-icon.json')} autoPlay loop />) :<View/>}
    </View>
  );
}


const styles = StyleSheet.create({
    container:{
       alignItems:'center',
       flex: 1,
       justifyContent: 'center',
       backgroundColor:'#4388D6'
    }
});
