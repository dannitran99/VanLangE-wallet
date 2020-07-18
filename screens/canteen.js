import React from 'react';
import { StyleSheet,FlatList,View,TouchableOpacity} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Badge} from 'react-native-elements';
import ProductItem from '../components/productItem';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

function Canteen({navigation, route }) {
  const [products, setProducts] = React.useState([]);
  const [order, setOrder] = React.useState([]);
  const [numOrder, setNumOrder] = React.useState(0);
  const [fullProducts, setFullProducts] = React.useState([]);
  const [keyword, setKeyword] = React.useState('');
  const [load, setLoad] = React.useState(false);


  React.useEffect(() => {
    route.params = null;
    setLoad(true);
    axios.get('https://vlu-ewallet.herokuapp.com/canteen-manager/getData').then(res =>{
       setFullProducts(res.data);
       setProducts(res.data);
       setLoad(false);
     }).catch(err =>{
         console.error(err);
      })
    axios.get('https://vlu-ewallet.herokuapp.com/payment/getAllOrder').then(res =>{
       setOrder(res.data);
       setNumOrder(res.data.length);
   }).catch(err =>{
       console.error(err);
    })
  }, [route.params?.post]);
  return (
    <View >
      <Spinner
          visible={load}
          color='00b5ec'
          animation='slide'
      />
      <FlatList
         data={formatData(products,2)}
         numColumns={2}
         renderItem={({item})=>{
           if(item.empty === true){
             return<View style={{backgroundColor:'transparent',flex:1}}/>
           }
           return(
             <View style={{flex:1}}>
               <ProductItem product={item} onPress={()=>{
                 navigation.navigate('Sửa sản phẩm căn tin',{detail:item});
               }}/>
             </View>
           );
          }
         }
         keyExtractor={item => `${item._id}`}
         ListHeaderComponent={<SearchBar placeholder='Tìm kiếm...' value={keyword}
            onChangeText={(text)=>searchFilterFunction(text)}
            lightTheme round />}/>
      {numOrder==0?undefined:(
        <TouchableOpacity style={{position:'absolute',bottom:10,right:10 ,flex:1,backgroundColor:'white',borderRadius:20}} onPress={()=>navigation.navigate('Đơn đặt hàng',{data:order})}>
            <Icon
              style={{padding:15}}
              name="file-text-o"
              size={30}
            />
            <Badge containerStyle={{position:'absolute',right:4,top:5}} value={numOrder} status="error" />
        </TouchableOpacity>
      )}
    </View>
  );
  function searchFilterFunction(text){
    setKeyword(text)
    const newData = fullProducts.filter(item => {
      const itemData = `${item.name}` +'';
      const textData = text.toLowerCase();
      return itemData.toLowerCase().indexOf(textData) > -1;
    });
    setProducts(newData);
  };
}
const formatData=(data, numColumns)=>{
  const full = Math.floor(data.length/numColumns);
  let numLastRow = data.length - (full* numColumns);
  while (numLastRow!== numColumns && numLastRow !==0 ) {
    data.push({_id:numLastRow, empty:true});
    numLastRow++;
  }
  return data;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Canteen;
