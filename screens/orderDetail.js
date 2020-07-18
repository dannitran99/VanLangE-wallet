import React from 'react'
import { StyleSheet, Text, View ,ScrollView,Image,TouchableOpacity,Alert,FlatList} from 'react-native';
import CartItem from '../components/cartItem'
import NumberFormat from 'react-number-format';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
const OrderDetail = ({navigation,route}) => {
  const [id, setId] = React.useState(route.params.data._id);
  const [items, setItems] = React.useState(route.params.data.cartItem);
  const [expoPushToken, setExpoPushToken] = React.useState(route.params.data.expoPushToken);
  const [load, setLoad] = React.useState(false);
  const [price, setPrice] = React.useState(route.params.data.price);
  const [time, setTime] = React.useState('');
  React.useEffect(() => {
    var time = new Date(route.params.data.time);
    setTime(time.getHours()+':'+time.getMinutes() +' ngày '+time.getDate()+'/' +(time.getMonth()+1));
  }, []);
  // function postPayment(){
  //   setDialogVisible(true);
  //   var now = new Date();
  //   axios.post('https://vlu-ewallet.herokuapp.com/payment/newPayment', {
  //      username:username,
  //      cartItem:items,
  //      type:type,
  //      price:price,
  //      date:now.toString()
  //    }).then(res =>{
  //      if(res.data.thongbao == 'Success' ) {
  //         if(expoPushToken!=''){
  //             sendPushNotification();
  //         }
  //         setChangeSuccess(true);
  //         AsyncStorage.setItem('userToken',res.data.token);
  //      }else{
  //        setDialogVisible(false);
  //        Alert.alert(
  //          'Thông báo',
  //          'Tài khoản của bạn không đủ để thanh toán.Vui lòng kiểm tra lại!',
  //          [{
  //              text: 'OK',
  //              onPress: () => navigation.goBack(),
  //              style: 'cancel'
  //            }],  { cancelable: false }
  //        );
  //      }
  //    }).catch(err =>{
  //        console.error(err);
  //     })
  // }
  function postOrder(){
    setLoad(true);
      axios.post('https://vlu-ewallet.herokuapp.com/payment/deleteOrder', {
         id:id
       }).then(res =>{
         if(res.data ) {
            if(expoPushToken!=''){
                sendPushNotification();
            }
            setLoad(false);
            Alert.alert(
              'Hoàn tất',
              '',
              [{
                  text: 'OK',
                  onPress: () => navigation.navigate('Căn tin',{post:'add'}),
                  style: 'cancel'
                }],  { cancelable: false }
            );
          }
       }).catch(err =>{
           console.error(err);
        })
  }

  const sendPushNotification = async () => {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Thông báo',
      body: 'Chuẩn bị hoàn tất đơn hàng',
      _displayInForeground: true,
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

    return (
      <View style={{flex:1}}>
          <Spinner
              visible={load}
              color='00b5ec'
              animation='slide'
          />
          <View style={{ flex: 1, padding: 10, marginTop:10}}>
                  <View style={styles.cart}>
                      <Text style={{  fontSize: 28, fontWeight: 'bold', }}>Giỏ hàng</Text>

                  </View>
                  <View style={{ marginTop: 8 ,flex:1}}>
                    <FlatList
                        data={items}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <CartItem data={item}/>}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />
                  </View>
                  <Text style={{marginLeft:20,marginBottom:10}}>Sẽ nhận hàng vào lúc: {time}</Text>
                  <View style={styles.totalCart}>
                      <Text style={{ color: '#919090', fontSize: 25 }}>Tổng cộng:</Text>
                      <NumberFormat
                         value={price}
                         displayType={'text'}
                         thousandSeparator={true}
                         suffix={' ₫'}
                         renderText={formattedValue => <Text style={{  fontSize: 33, fontWeight: 'bold' }}>{formattedValue}</Text>} // <--- Don't forget this!
                       />
                  </View>
                  <View style={{ alignSelf: 'center',  marginBottom:30 }}>
                      <TouchableOpacity activeOpacity={0.7} onPress={()=>postOrder()}>
                          <View style={styles.customButton}>
                              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Chuẩn bị hoàn tất</Text>
                          </View>
                      </TouchableOpacity>
                  </View>
          </View>
      </View>
    )
}

export default OrderDetail
const styles = StyleSheet.create({
  cart: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 20,
      marginTop: 10,
  },
  bgCart: {
      backgroundColor: '#febc40',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 120,
      width: 55,
      height: 55,
  },
  totalCart: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 22,
  },
  customButton: {
      marginTop: 35,
      backgroundColor: '#4388D6',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 60,
      width: 280,
      height: 50,
  }
})
