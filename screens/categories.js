import React from 'react';
import { StyleSheet,View,Alert,AsyncStorage ,ImageBackground,Text,Dimensions,Image,TouchableOpacity,StatusBar} from 'react-native';
import Market from '../assets/market.png';
import Food from '../assets/food.png';
import Book from '../assets/book.png';
import Bike from '../assets/bike.png';
import BackgroundImage1 from '../assets/shopping.jpg';
import BackgroundImage2 from '../assets/canteen.jpg';
import BackgroundImage3 from '../assets/library.jpg';
import BackgroundImage4 from '../assets/parking.jpg';
var jwtDecode = require('jwt-decode');

function Categories({navigation}) {
  const [role, setRole] = React.useState('');

  React.useEffect(() => {
    AsyncStorage.getItem('userToken', (err, result) => {
      var decoded = jwtDecode(result);
      setRole(decoded.role);
    });
  }, []);

  return (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={{padding:10, fontSize:20,fontWeight:'bold'}}>Danh sách dịch vụ</Text>
        <TouchableOpacity style={{flex:1,paddingVertical:5}} onPress={()=>{
          if(role == 'manager' || role =='market-manager')navigation.navigate('Siêu thị');
          else Alert.alert('Thông báo','Bạn không có quyền vào mục này!');
        }}>
          <ImageBackground source={BackgroundImage1} style={{flex:1,width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center'}}>
            <Text style={styles.textStyle}>Siêu thị Văn Lang</Text>
            <View style={{  borderRadius:40,backgroundColor:'white',elevation:4}}>
              <Image style={styles.categoryImage} source={Market}/>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1,paddingVertical:5}}  onPress={()=>{
          if(role == 'manager' || role =='canteen-manager')navigation.navigate('Căn tin');
          else Alert.alert('Thông báo','Bạn không có quyền vào mục này!');
        }}>
          <ImageBackground source={BackgroundImage2} style={{flex:1,width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center'}}>
            <Text style={styles.textStyle}>Căn tin</Text>
            <View style={{  borderRadius:40,backgroundColor:'white',elevation:4}}>
              <Image style={styles.categoryImage} source={Food}/>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1,paddingVertical:5}} onPress={()=>{
          if(role == 'manager' || role =='library-manager')navigation.navigate('Thư viện');
          else Alert.alert('Thông báo','Bạn không có quyền vào mục này!');
        }}>
          <ImageBackground source={BackgroundImage3} style={{flex:1,width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center'}}>
            <Text style={styles.textStyle}>Thư viện</Text>
            <View style={{  borderRadius:40,backgroundColor:'white',elevation:4}}>
              <Image style={styles.categoryImage} source={Book}/>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1,paddingVertical:5}} onPress={()=>{
          if(role == 'manager' || role =='parking-manager')navigation.navigate('Gửi xe');
          else Alert.alert('Thông báo','Bạn không có quyền vào mục này!');
        }}>
          <ImageBackground source={BackgroundImage4} style={{flex:1,width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center'}}>
            <Text style={styles.textStyle}>Giữ xe</Text>
            <View style={{  borderRadius:40,backgroundColor:'white',elevation:4}}>
              <Image style={styles.categoryImage} source={Bike}/>
            </View>
          </ImageBackground>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  },
  textStyle:{
    fontSize:20,
    fontWeight:'bold',
    padding:10,
    color:'white',
    textShadowColor:'#000',
    textShadowRadius:20,
  },
  categoryImage:{
    width:64,
    height:64,
    margin:10
  }
})

export default Categories;
