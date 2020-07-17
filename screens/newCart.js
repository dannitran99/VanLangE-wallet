import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button ,Alert,AsyncStorage} from 'react-native';
import {Dialog} from 'react-native-simple-dialogs';
import { CheckBox } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import axios from 'axios';
var jwtDecode = require('jwt-decode');
import { useFocusEffect } from '@react-navigation/native'
export default function NewCart({navigation}) {
  const [dialogVisible, setDialogVisible] = React.useState(true);
  const [cart,setCart] = React.useState('');
  const [products,setProducts] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const [role, setRole] = React.useState('');
  React.useEffect(() => {
    if(role == ''){
      AsyncStorage.getItem('userToken', (err, result) => {
        var decoded = jwtDecode(result);
        setRole(decoded.role);
      });
    }
    if(cart !== ''){
      setLoad(true);
      switch (cart) {
        case 'Market':
          axios.get('https://vlu-ewallet.herokuapp.com/market-manager/getData').then(res =>{
             setProducts(res.data);
             navigation.navigate('Giỏ hàng',{products:res.data,type:'market'});
             setLoad(false);
          }).catch(err =>{
               console.error(err);
          })
          break;
        case 'Canteen':
          axios.get('https://vlu-ewallet.herokuapp.com/canteen-manager/getData').then(res =>{
             setProducts(res.data);
             navigation.navigate('Giỏ hàng',{products:res.data,type:'canteen'});
             setLoad(false);
          }).catch(err =>{
               console.error(err);
          })
          break;
        case 'Library':
          axios.get('https://vlu-ewallet.herokuapp.com/library-manager/getData').then(res =>{
             setProducts(res.data);
             navigation.navigate('Giỏ hàng',{products:res.data,type:'library'});
             setLoad(false);
          }).catch(err =>{
               console.error(err);
          })
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
          title="Tạo giỏ hàng cho"
          onTouchOutside={() => setDialogVisible(false)}>
          <View>
            <CheckBox
              title='Siêu thị'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              onPress={()=>{
                if(role == 'manager' || role =='market-manager'){
                  setDialogVisible(false);
                  if(cart !== 'Market')setCart('Market')
                  else navigation.navigate('Giỏ hàng',{products:products,type:'market'});
                }else Alert.alert('Thông báo','Bạn không có quyền vào mục này!');
              }}
            />
            <CheckBox
              title='Căn tin'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              onPress={()=>{
                if(role == 'manager' || role =='canteen-manager') {
                  setDialogVisible(false);
                  if(cart !== 'Canteen')setCart('Canteen')
                  else navigation.navigate('Giỏ hàng',{products:products,type:'canteen'});
                }else Alert.alert('Thông báo','Bạn không có quyền vào mục này!');
              }}
            />
            <CheckBox
            title='Thư viện'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={()=>{
              if(role == 'manager' || role =='library-manager'){
                setDialogVisible(false);
                if(cart !== 'Library')setCart('Library')
                else navigation.navigate('Giỏ hàng',{products:products,type:'library'});
              }else Alert.alert('Thông báo','Bạn không có quyền vào mục này!');
            }}
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
