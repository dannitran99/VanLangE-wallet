import React from 'react';
import { StyleSheet,View,TextInput ,Image,TouchableOpacity,Alert,Text,ScrollView} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LottieView from 'lottie-react-native';
import * as ImagePicker from 'expo-image-picker';
//import Constants from 'expo-constants';

import axios from 'axios';

function AddCanteenProduct({navigation, route }) {
  const [picture, setPicture] = React.useState('https://cdn1.iconfinder.com/data/icons/social-17/48/photos2-512.png');
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [barcode, setBarcode] = React.useState('');
  const [load, setLoad] = React.useState(false);

 // khi nao can dung toi IOS

  // useEffect(() => {
  //   (async () => {
  //     if (Constants.platform.ios) {
  //       const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
  //       if (status !== 'granted') {
  //         alert('Sorry, we need camera roll permissions to make this work!');
  //       }
  //     }
  //   })();
  // }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1,1],
      quality:0.3,
      base64:true
    });
    if (!result.cancelled) {
      setPicture('data:image/jpg;base64,'+result.base64);
    }
  };

  function postData(){
    setLoad(true);
    if(name=='' || price == ''  || barcode == ''  || picture == 'https://cdn1.iconfinder.com/data/icons/social-17/48/photos2-512.png'){
      setLoad(false);
      return Alert.alert('Thông báo',"Bạn cần nhập đầy đủ thông tin!")
    }
    axios.post('https://vlu-ewallet.herokuapp.com/library-manager/newProduct', {
       name: name,
       price: price,
       image:picture,
       barcode:barcode
     }).then(res =>{
       if(res.data == 'Success' ) {
         setLoad(false);
         navigation.navigate('Thư viện',{post:'add'});
       }else{
         setLoad(false);
         Alert.alert('Thông báo','Lỗi!');
       }
     }).catch(err =>{
         console.error(err);
      })
  }
  React.useEffect(() => {
    if (route.params?.post) {
      setPicture('data:image/jpg;base64,'+route.params.post);
    }
    if (route.params?.barcode) {
      setBarcode(route.params.barcode+'');
    }
  }, [route.params?.post,route.params?.barcode]);
  return (
    <ScrollView>
        <View style={styles.container}>
            <Spinner
                visible={load}
                color='00b5ec'
                animation='slide'
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder='Tên sản phẩm'
                onChangeText={setName}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder='Giá'
                keyboardType='number-pad'
                onChangeText={setPrice}
              />
            </View>
            <View style={{flexDirection:"row", alignItems:'center'}}>
              <View style={styles.inputContainer}>
                <TextInput
                  value={barcode}
                  style={styles.input}
                  placeholder='Barcode'
                  keyboardType='number-pad'
                  onChangeText={setBarcode}
                />
                <TouchableOpacity style={styles.barcode} onPress={()=>navigation.navigate('Scan',{screen:'addLibrary'})}>

                    <LottieView style={{width:40}} source={require('../anim/4089-barcode-scanner.json')} autoPlay loop />
                </TouchableOpacity>
              </View>
            </View>

            <Image style={{width: 100, height: 100}} source={{uri:picture}}/>
            <View style={{ flexDirection:"row",margin:20}}>
            <TouchableOpacity style={styles.icon}>
              <Ionicons name='ios-images' size={60} onPress={pickImage} />
            </TouchableOpacity>
              <TouchableOpacity style={styles.icon} onPress={()=>navigation.navigate('Camera',{screen:'addLibrary'})}>
                <Ionicons name='ios-camera' size={60} />
              </TouchableOpacity>
            </View>
            <Button
             buttonStyle={styles.addButton}
              icon={
               <Icon
                 name="check-circle-o"
                 size={20}
                 color="white"
               />
              }
              title="   Thêm"
              onPress={postData}
            />
          </View>
      </ScrollView>
  );
}
const styles = StyleSheet.create({
  icon:{
    backgroundColor:'#00b5ec',
    paddingHorizontal:10,
    margin:10,
    marginHorizontal:30,
    borderRadius:30
  },
  input: {
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:60
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#DEEBF6',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  addButton:{
    paddingHorizontal:30,
    paddingVertical:10
  },
  barcode:{
    backgroundColor:'white',
    padding:4,
    borderRadius:15,
    elevation:5
  }
})

export default AddCanteenProduct;
