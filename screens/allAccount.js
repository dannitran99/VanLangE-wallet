import React from 'react'
import { StyleSheet, Text, View ,FlatList,TouchableOpacity,RefreshControl} from 'react-native'
import { SearchBar, } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import ProfileItem from '../components/profileItem';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
const AllAccount = ({navigation}) => {
  const [products, setProducts] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const [fullProducts, setFullProducts] = React.useState([]);
  const [keyword, setKeyword] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLoad(true);
    axios.get('https://vlu-ewallet.herokuapp.com/account-manager/all').then(res =>{
        setProducts(res.data);
        setFullProducts(res.data);
        setLoad(false);
     }).catch(err =>{
         console.error(err);
      })
      setRefreshing(false);
  }, []);
  React.useEffect(() => {
    setLoad(true);
    axios.get('https://vlu-ewallet.herokuapp.com/account-manager/all').then(res =>{
        setProducts(res.data);
        setFullProducts(res.data);
        setLoad(false);
     }).catch(err =>{
         console.error(err);
      })
  },[] );
    return (
      <View style={styles.container}>
        <Spinner
            visible={load}
            color='00b5ec'
            animation='slide'
        />
        <FlatList
          refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          keyExtractor={item => `${item._id}`}
          data={products}
          renderItem={({item})=> <ProfileItem data={item} onPress={()=>navigation.navigate('AccountDetail',{data:item})}/>}
          ListHeaderComponent={<SearchBar placeholder='Tìm kiếm...' value={keyword}
             containerStyle={{backgroundColor:'transparent'}}
             onChangeText={(text)=>searchFilterFunction(text)}
             lightTheme round />}
        />
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



const styles = StyleSheet.create({
  container:{
    flex:1
  }
})
export default AllAccount
