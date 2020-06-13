import React from 'react';
import { StyleSheet,View,TextInput,Button ,Image,TouchableOpacity,Alert,Text} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';

import axios from 'axios';

function AddProduct({navigation, route }) {
  const [picture, setPicture] = React.useState('https://cdn1.iconfinder.com/data/icons/social-17/48/photos2-512.png');
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [load, setLoad] = React.useState(false);
  function postData(){
    setLoad(true);
    if(name=='' || price == ''  || picture == 'https://cdn1.iconfinder.com/data/icons/social-17/48/photos2-512.png'){
      setLoad(false);
      return Alert.alert('Thông báo',"Bạn cần nhập đầy đủ thông tin!")
    }
    axios.post('http://192.168.1.9:1234/manager/newProduct', {
       name: name,
       price: price,
       image:picture
     }).then(res =>{
       if(res.data == 'Success' ) {
         setLoad(false);
         navigation.navigate('Siêu thị',{post:'add'});
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
  }, [route.params?.post]);
  return (
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
        <Image style={{width: 100, height: 100}} source={{uri:picture}}/>
        <View style={{ flexDirection:"row",margin:20}}>
        <TouchableOpacity style={styles.icon}>
          <Ionicons name='ios-images' size={60} />
        </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={()=>navigation.navigate('Camera',{screen:'addProduct'})}>
            <Ionicons name='ios-camera' size={60} />
          </TouchableOpacity>
        </View>
          <TouchableOpacity style={styles.addButton} onPress={postData}>
            <Text style={{color:'#FFF'}}>Thêm</Text>
          </TouchableOpacity>
      </View>

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
    alignItems: 'center'
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
    marginTop:20,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:100,
    borderRadius:30,
    backgroundColor:'#000'
  }
})

export default AddProduct;
