import React from 'react';
import { StyleSheet,FlatList,Alert,AsyncStorage } from 'react-native';
import CategoryItem from '../components/categoryItem';
import Market from '../assets/market.png';
import Food from '../assets/food.png';
import Book from '../assets/book.png';
import Bike from '../assets/bike.png';
var jwtDecode = require('jwt-decode');

function Categories({navigation}) {
  const [category] = React.useState([
    {id:1,name:"Siêu thị Văn Lang",image:Market},
    {id:2,name:"Căn tin",image:Food},
    {id:3,name:"Thư viện",image:Book},
    {id:4,name:"Gửi xe",image:Bike}
  ]);
  const [role, setRole] = React.useState('');

  React.useEffect(() => {
    AsyncStorage.getItem('userToken', (err, result) => {
      var decoded = jwtDecode(result);
      setRole(decoded.role);
    });
  }, []);

  return (
     <FlatList
        data={category}
        renderItem={({item})=> <CategoryItem category={item} onPress={()=>
          {
              switch(item.id){
                case 1:
                    if(role == 'manager' || role =='market-manager') {navigation.navigate('Siêu thị');break;}
                    Alert.alert('Thông báo','Bạn không có quyền vào mục này!'); break;
                case 2:
                    if(role == 'manager' || role =='canteen-manager') {navigation.navigate('Căn tin');break;}
                    Alert.alert('Thông báo','Bạn không có quyền vào mục này!'); break;
                case 3:
                    if(role == 'manager' || role =='library-manager') {navigation.navigate('Thư viện');break;}
                    Alert.alert('Thông báo','Bạn không có quyền vào mục này!'); break;
                case 4:
                    if(role == 'manager' || role =='parking-manager') {navigation.navigate('Gửi xe');break;}
                    Alert.alert('Thông báo','Bạn không có quyền vào mục này!'); break;
                default: break;
              }
            }
          }
        />}
        keyExtractor={item => `${item.id}`}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Categories;
