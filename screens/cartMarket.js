import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,FlatList ,Alert,TouchableOpacity,Button,RefreshControl} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import LottieView from 'lottie-react-native';
import Swiper from 'react-native-swiper';
import NumberFormat from 'react-number-format';
import { SearchBar } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import ProductCartItem from '../components/productCartItem';
export default function NewCart({navigation,route}){
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = React.useState(false);
  const [products,setProducts] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const [filterProducts,setFilterProducts] = React.useState([]);
  const [cartItem,setCartItem] = React.useState([]);
  const [amount, setAmount] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [keyword, setKeyword] = React.useState('');
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLoad(true);
    axios.get('https://vlu-ewallet.herokuapp.com/'+route.params.type+'-manager/getData').then(res =>{
        setProducts(res.data);
        setFilterProducts(res.data);
        setLoad(false);
     }).catch(err =>{
         console.error(err);
      })
      setRefreshing(false);
  }, []);
  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    setProducts(route.params.products);
    setFilterProducts(route.params.products);
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      let sumAmount = 0;
      let sumPrice = 0;
      for(let i = 0; i<cartItem.length;i++){
        sumPrice += cartItem[i].price * cartItem[i].amount;
        sumAmount += cartItem[i].amount;
      }
      setAmount(sumAmount);
      setPrice(sumPrice);
    }, [])
  );
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    let arr = cartItem;
    let find =false;
    for(let i = 0; i<products.length;i++){
      if(products[i].barcode == data){
        find = true;
        let find_incart = false;
        for(let j = 0; j<arr.length;j++){
          if(arr[j].name == products[i].name){
            arr[j].amount ++;
            find_incart = true;
            break;
          }
        }
        if(!find_incart) arr.push({id:products[i]._id,name:products[i].name,amount:1,price:products[i].price});
        setCartItem(arr);
        let newAmount = amount+1;
        let newPrice = price+products[i].price;
        setAmount(newAmount);
        setPrice(newPrice);
        break;
      }
    }
    if(!find)Alert.alert('Thông báo','Không tìm thấy sản phẩm!');
  };

  if (hasPermission === null) {
    return <Text>Kiểm tra thông tin cấp quyền</Text>;
  }
  if (hasPermission === false) {
    return <Text>Không thể dùng camera</Text>;
  }

  function searchFilterFunction(text){
    setKeyword(text)
    const newData = products.filter(item => {
      const itemData = `${item.name}` +'';
      const textData = text.toLowerCase();
      return itemData.toLowerCase().indexOf(textData) > -1;
    });
    setFilterProducts(newData);
  };

  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'flex-end'}}>
        <Spinner
            visible={load}
            color='00b5ec'
            animation='slide'
        />
       <Swiper style={styles.wrapper} showsButtons={true} loop={false}>
            <View
              style={styles.container}>
              <BarCodeScanner
                style={{position:'absolute'}}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13,
                               BarCodeScanner.Constants.BarCodeType.ean8,
                              ]}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
              />

              {isFocused ?(<LottieView style={{width:300}} source={require('../anim/4692-scanner.json')} autoPlay loop />) :<View/>}
              {scanned &&   <TouchableOpacity style={{position:'absolute',alignItems:'flex-end'}} onPress={() => setScanned(false)}>
                       <Icon
                         name="refresh"
                         size={200}
                         color="#fff"
                       />
                  </TouchableOpacity>}
            </View>
            <View style={{padding:5,paddingVertical:10}}>
              <FlatList
                 refreshControl={
                   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                 data={filterProducts}
                 renderItem={({item})=> <ProductCartItem product={item} onPress={()=>{
                       let arr = cartItem;
                       let find =false;
                       for(let i = 0; i<arr.length;i++){
                         if(arr[i].name == item.name){
                           arr[i].amount ++;
                           find = true;
                           break;
                         }
                       }
                       if(!find) arr.push({id:item._id,name:item.name,amount:1,price:item.price});
                       let newAmount = amount + 1;
                       let newPrice = price + item.price;
                       setAmount(newAmount);
                       setPrice(newPrice)
                       setCartItem(arr);
                 }}/>}
                 keyExtractor={item => `${item._id}`}
                 ListHeaderComponent={<SearchBar placeholder='Tìm kiếm...' value={keyword}
                    onChangeText={(text)=>searchFilterFunction(text)}
                    lightTheme round />}/>
            </View>
        </Swiper>
        {amount ==0 ? undefined :
          (<TouchableOpacity style={styles.cartPreview} onPress={()=>navigation.navigate('Thanh toán',{cartItem:cartItem,amount:amount,price:price,type:route.params.type})}>
                <View style={{flexDirection:"row",flex:1}}>
                  <Text style={{color:'#fff',fontWeight:'bold'}}>Xem giỏ hàng</Text>
                  <Text style={{color:'#fff',marginLeft:10}}>{amount} món</Text>
                </View>
                <NumberFormat
                   value={price}
                   displayType={'text'}
                   thousandSeparator={true}
                   suffix={' ₫'}
                   renderText={formattedValue => <Text style={{color:'#fff',fontWeight:'bold'}}>{formattedValue}</Text>} // <--- Don't forget this!
                 />
            </TouchableOpacity>)}
    </View>
  );
}


const styles = StyleSheet.create({
    container:{
       alignItems:'center',
       flex: 1,
       justifyContent: 'center',
    },
    cartPreview:{
      paddingHorizontal:10,
      flexDirection:"row",
      bottom:70,
      position:'absolute',
      backgroundColor: "#4388D6",
      borderRadius:30,
      width:300,
      height:45,
      justifyContent:'center',
      alignItems:'center',
      borderWidth:3,
      borderColor:'#FFF',
      elevation:4
    },
    wrapper: {}
});
