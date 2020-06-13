import React from 'react';
import { StyleSheet,View,TextInput,Button ,Image,TouchableOpacity,Alert,Text,CheckBox} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

function EditProduct({route,navigation}) {
  const [id, setId] = React.useState(route.params.detail._id);
  const [picture, setPicture] = React.useState(route.params.detail.image||'https://cdn1.iconfinder.com/data/icons/social-17/48/photos2-512.png');
  const [name, setName] = React.useState(route.params.detail.name);
  const [price, setPrice] = React.useState(route.params.detail.price);
  const [avail, setAvail] = React.useState(route.params.detail.available);
  const [load, setLoad] = React.useState(false);
  React.useEffect(() => {
    if (route.params?.post) {
      setPicture('data:image/jpg;base64,'+route.params.post);
    }
  }, [route.params?.post]);
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
          axios.post('http://192.168.1.9:1234/manager/deleteProduct', {
             id:id
           }).then(res =>{
             if(res.data == true ) {
               setLoad(false);
               navigation.navigate('Siêu thị',{post:id});
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
  const updateProduct = () =>{
    setLoad(true);
    if(name=='' || price == ''  || picture == 'https://cdn1.iconfinder.com/data/icons/social-17/48/photos2-512.png'){
      setLoad(false);
      return Alert.alert('Thông báo',"Bạn cần nhập đầy đủ thông tin!")
    }
    axios.post('http://192.168.1.9:1234/manager/editProduct', {
       id: id,
       name: name,
       price: price,
       avail: avail,
       image:picture
     }).then(res =>{
       if(res.data == 'Success' ) {
         setLoad(false);
         navigation.navigate('Siêu thị',{post:id});
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
          <Spinner
              visible={load}
              color='00b5ec'
              animation='slide'
          />
          <View style={[styles.inputContainer,{backgroundColor:'gray'}]}>
            <TextInput
              value={id}
              style={styles.input}
              placeholder='ID'
              editable={false}
            />
          </View>
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
          <TouchableOpacity style={styles.icon}>
            <Ionicons name='ios-images' size={60} />
          </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={()=>navigation.navigate('Camera',{screen:'editProduct'})}>
              <Ionicons name='ios-camera' size={60} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection:"row"}}>
            <TouchableOpacity style={[styles.addButton,{backgroundColor:'red'}]} onPress={deleteData}>
              <Text style={{color:'#FFF'}}>Xóa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={updateProduct}>
              <Text style={{color:'#FFF'}}>Sửa</Text>
            </TouchableOpacity>
          </View>
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
    marginHorizontal:35,
    flex:1,
    marginTop:20,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:100,
    borderRadius:30,
    backgroundColor:'#000'
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
  }
})

export default EditProduct;
