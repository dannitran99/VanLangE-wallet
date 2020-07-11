import React from 'react';
import { StyleSheet,FlatList,Text,View,TouchableOpacity } from 'react-native';
import NumberFormat from 'react-number-format';
import LottieView from 'lottie-react-native';
import CartPayment from '../components/cartPayment';
import {Dialog} from 'react-native-simple-dialogs';
import QRCode from 'react-native-qrcode-generator';
const shortid = require('shortid');
import axios from 'axios';
function Payment({navigation,route}) {
  const [id, setId] = React.useState("");
  const [price, setPrice] = React.useState(route.params.price);
  const [cartItem, setCartItem] = React.useState(route.params.cartItem);
  const [amount, setAmount] = React.useState(route.params.amount);
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  React.useEffect(() => {
    let arr = [];
    for(let i = 0; i<cartItem.length;i++){
      if(cartItem[i].amount !=0){
        arr.push(cartItem[i]);
      }
    }
    setCartItem(arr);
  }, [route.params?.cartItem]);
  function payment(){
    let newid = "vlew" + shortid.generate();
    setId(newid);
    setDialogVisible(true);
    setLoad(true);
    axios.post('https://vlu-ewallet.herokuapp.com/temp/saveTempdata', {
       id:newid,
       cartItem: cartItem,
       price:price,
       amount:amount,
       type:route.params.type
     }).then(res =>{
       if(res.data == 'Success' ) {
         setLoad(false);
       }else{
         setLoad(false);
         Alert.alert('Thông báo','Lỗi!');
       }
     }).catch(err =>{
         console.error(err);
      })
  }
  return (
    <View style={styles.container}>
      <Dialog
          visible={dialogVisible}>

        {load ?(<LottieView style={{width:300}} source={require('../anim/4495-shopping-basket.json')} autoPlay loop />) :(
            <View style={{justifyContent:'center',alignItems:'center'}}>
              <QRCode
                value={id}
                size={300}
                bgColor='black'
                fgColor='white'/>
              <TouchableOpacity onPress={()=>setDialogVisible(false)}>
                <Text style={{fontWeight:'bold',fontSize:30,paddingTop:30,paddingHorizontal:100}}>Hủy</Text>
              </TouchableOpacity>
            </View>
              )}
      </Dialog>
      <View style={{flex:1}}>
        <View style={styles.header}>
         <Text style={styles.titleHeader}>Tóm tắt đơn hàng ({amount} món)</Text>
         <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Text style={styles.addItem}>Thêm món</Text>
         </TouchableOpacity>
        </View>
        <FlatList
           data={cartItem}
           renderItem={({item})=> <CartPayment cartItem={item}
           onPressAdd={()=>{
             let arr = cartItem;
             for(let i = 0; i<arr.length;i++){
               if(arr[i].name == item.name){
                 arr[i].amount ++;
                 break;
               }
             }
             let newAmount = amount + 1;
             let newPrice = price + item.price;
             setAmount(newAmount);
             setPrice(newPrice)
             setCartItem(arr);
           }}
           onPressMinus={()=>{
             let arr = cartItem;
             for(let i = 0; i<arr.length;i++){
               if(arr[i].name == item.name){
                 arr[i].amount --;
                 break;
               }
             }
             let newAmount = amount - 1;
             let newPrice = price - item.price;
             setAmount(newAmount);
             setPrice(newPrice)
             setCartItem(arr);
           }} />}
           keyExtractor={item => `${item.id}`}/>
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
        {amount != 0 ?(
          <TouchableOpacity style={styles.buttonPay} onPress={()=>payment()}>
            <View style={{flex:1,alignItems:'center'}}>
              <Text style={{color:'#fff',fontWeight:'bold',fontSize:20}}>Thanh toán</Text>
            </View>
          </TouchableOpacity>):(
          <View style={styles.hidebutton}>
            <View style={{flex:1,alignItems:'center'}}>
              <Text style={{color:'#fff',fontWeight:'bold',fontSize:20}}>Thanh toán</Text>
            </View>
          </View>
          )}

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
    flexDirection:'row',
    backgroundColor:'#dbdbdb',
    height:40,
    alignItems:'center',
    justifyContent:'center'
  },
  titleHeader:{
    flex:1,
    paddingHorizontal:15,
    fontSize:20,
    color:'#6b6b6b'
  },
  addItem:{
    padding:10,
    color:'#4388D6'
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
  },
  hidebutton:{
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center',
    height:50,
    backgroundColor:'#8ab4e3',
    flexDirection:"row",
    marginVertical:10
  }
});


export default Payment;
