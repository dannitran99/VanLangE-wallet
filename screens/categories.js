import React from 'react';
import { StyleSheet,FlatList,Alert } from 'react-native';
import CategoryItem from '../components/categoryItem';
import Market from '../assets/market.png';
import Food from '../assets/food.png';
import Book from '../assets/book.png';
import Bike from '../assets/bike.png';

function Categories({navigation}) {
  const [category] = React.useState([
    {id:1,name:"Siêu thị Văn Lang",image:Market},
    {id:2,name:"Căn tin",image:Food},
    {id:3,name:"Thư viện",image:Book},
    {id:4,name:"Gửi xe",image:Bike}
  ]);



  return (
     <FlatList
        data={category}
        renderItem={({item})=> <CategoryItem category={item} onPress={()=>
          {
              switch(item.id){
                case 1: navigation.navigate('Siêu thị');break;
                case 2: navigation.navigate('Căn tin');break;
                case 3: navigation.navigate('Thư viện');break;
                case 4: navigation.navigate('Gửi xe');break;
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
