import React from 'react';
import { StyleSheet,View,Text,ScrollView,TextInput,TouchableOpacity ,Alert} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';
import axios from 'axios';
const AddVoucher = ({navigation}) => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [point, setPoint] = React.useState('');
  const [exchange, setExchange] = React.useState('');
  const [load, setLoad] = React.useState(false);
  function postData(){
    setLoad(true);
    if(name=='' || description == ''  || point == ''  || exchange == ''){
      setLoad(false);
      return Alert.alert('Thông báo',"Bạn cần nhập đầy đủ thông tin!")
    }
    axios.post('https://vlu-ewallet.herokuapp.com/voucher/newVoucher', {
       name: name,
       description: description,
       point:point,
       exchange:exchange
     }).then(res =>{
       if(res.data == 'Success' ) {
         setLoad(false);
         navigation.navigate('Voucher',{post:'add'});
       }else{
         setLoad(false);
         Alert.alert('Thông báo','Lỗi!');
       }
     }).catch(err =>{
         console.error(err);
      })
  }
    return(
      <ScrollView >
          <View style={styles.container}>
              <Spinner
                  visible={load}
                  color='00b5ec'
                  animation='slide'
              />
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder='Tên Voucher'
                  onChangeText={setName}
                  placeholderTextColor="grey"
                />
              </View>
              <View style={styles.inputContainerArea}>
                <TextInput
                  style={styles.inputArea}
                  placeholder='Mô tả Voucher'
                  onChangeText={setDescription}
                  numberOfLines={10}
                  multiline={true}
                  placeholderTextColor="grey"
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder='Điểm đổi'
                  keyboardType='number-pad'
                  onChangeText={setPoint}
                  placeholderTextColor="grey"
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder='Số tiền nhận được'
                  keyboardType='number-pad'
                  onChangeText={setExchange}
                  placeholderTextColor="grey"
                />
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
    inputContainerArea: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#DEEBF6',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:100,
        marginBottom:20,
        flexDirection: 'row',
    },
    inputArea:{
      marginTop:10,
      textAlignVertical: 'top',
      height:45,
      marginHorizontal:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
    }
  });
  export default AddVoucher
