import React from 'react';
import { StyleSheet,View,TextInput ,Image,TouchableOpacity,Alert,Text,CheckBox,ScrollView} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';

import LottieView from 'lottie-react-native';
import axios from 'axios';

function EditCanteenProduct({route,navigation}) {
  const [id, setId] = React.useState(route.params.detail._id);
  const [picture, setPicture] = React.useState(route.params.detail.image||'https://cdn1.iconfinder.com/data/icons/social-17/48/photos2-512.png');
  const [name, setName] = React.useState(route.params.detail.name);
  const [price, setPrice] = React.useState(route.params.detail.price);
  const [barcode, setBarcode] = React.useState(route.params.detail.barcode);
  const [avail, setAvail] = React.useState(route.params.detail.available);
  const [load, setLoad] = React.useState(false);
  React.useEffect(() => {
    if (route.params?.post) {
      setPicture('data:image/jpg;base64,'+route.params.post);
    }
    if (route.params?.barcode) {
      setBarcode(route.params.barcode+'');
    }
  }, [route.params?.post,route.params?.barcode]);
  function deleteData(){
    Alert.alert(
      "Thông báo",
      "Bạn có chắc muốn xóa?",
      [
        {
          text: "Hủy",
          onPress: () => {},
          style: "cancel"
        },
        { text: "OK", onPress: () => {
          setLoad(true);
          axios.post('https://vlu-ewallet.herokuapp.com/canteen-manager/deleteProduct', {
             id:id
           }).then(res =>{
             if(res.data == true ) {
               setLoad(false);
               navigation.navigate('Căn tin',{post:id});
             }else{
               setLoad(false);
               Alert.alert('Thông báo','Lỗi!');
             }
           }).catch(err =>{
               console.error(err);
            })
        } }
      ],
      { cancelable: false }
    );
  }
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
  function updateProduct(){
    setLoad(true);
    if(name=='' || price == ''  || barcode == ''|| picture == 'https://cdn1.iconfinder.com/data/icons/social-17/48/photos2-512.png'){
      setLoad(false);
      return Alert.alert('Thông báo',"Bạn cần nhập đầy đủ thông tin!")
    }
    const value={id: id,
    name: name,
    price: price,
    avail: avail,
    image:picture,
    barcode:barcode}
    axios.post('https://vlu-ewallet.herokuapp.com/canteen-manager/editProduct', value).then(res =>{
       if(res.data == 'Success' ) {
         setLoad(false);
         navigation.navigate('Căn tin',{post:id});
       }else{
         setLoad(false);
         Alert.alert('Thông báo','Lỗi!');
       }
     }).catch(err =>{
         console.error(err);
      })
  }
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
              value={name}
              style={styles.input}
              placeholder='Tên sản phẩm'
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={price.toString()}
              style={styles.input}
              placeholder='Giá'
              keyboardType='number-pad'
              onChangeText={setPrice}
            />
          </View>
          <View style={{flexDirection:"row", alignItems:'center'}}>
            <View style={styles.inputContainer}>
              <TextInput
                value={barcode.toString()}
                style={styles.input}
                placeholder='Barcode'
                keyboardType='number-pad'
                onChangeText={setBarcode}
              />
              <TouchableOpacity style={styles.barcode} onPress={()=>navigation.navigate('Scan',{screen:'editCanteen'})}>
                  <LottieView style={{width:40}} source={require('../anim/4089-barcode-scanner.json')} autoPlay loop />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={avail}
              onValueChange={setAvail}
              style={styles.checkbox}
            />
            <Text style={styles.label}>Hiển thị mặt hàng?</Text>
          </View>
          <Image style={{width: 100, height: 100}} source={{uri:picture}}/>
          <View style={{ flexDirection:"row",margin:20}}>
          <TouchableOpacity style={styles.icon} onPress={pickImage}>
            <Ionicons name='ios-images' size={60} />
          </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={()=>navigation.navigate('Camera',{screen:'editCanteen'})}>
              <Ionicons name='ios-camera' size={60} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection:"row"}}>
            <Button
             buttonStyle={styles.addButton}
              icon={
               <Icon
                 name="trash-o"
                 size={20}
                 color="#4388D6"
               />
              }
              title="   Xóa"
              type="outline"
              onPress={deleteData}
            />
            <Button
             buttonStyle={styles.addButton}
              icon={
               <Icon
                 name="check-circle-o"
                 size={20}
                 color="white"
               />
              }
              title="   Sửa"
              onPress={updateProduct}
            />
          </View>
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
    marginHorizontal:35,
    paddingHorizontal:30,
    paddingVertical:10
  },
  checkboxContainer: {
     flexDirection: "row",
     marginBottom: 20,
   },
   checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  barcode:{
    backgroundColor:'white',
    padding:8,
    borderRadius:15,
    elevation:5
  }
})

export default EditCanteenProduct;
