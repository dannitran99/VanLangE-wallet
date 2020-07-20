import React from 'react'
import { StyleSheet, Text, View, Image, StatusBar,FlatList } from 'react-native'
import axios from 'axios';
import VoucherItem from '../components/voucherItem';
import Spinner from 'react-native-loading-spinner-overlay';
const Voucher = ({navigation, route}) => {
  const [data, setData] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  React.useEffect(() => {
    route.params = null;
    setLoad(true);
    axios.get('https://vlu-ewallet.herokuapp.com/voucher/getData').then(res =>{
       setData(res.data);
       setLoad(false);
     }).catch(err =>{
         console.error(err);
      })
  }, [route.params?.post]);
  return (
          <>
            {load?(
              <Spinner
                  visible={load}
                  color='00b5ec'
                  animation='slide'
              />
            ):(
              <View style={styles.container}>
                  <View style={styles.panelBody}>
                      <FlatList
                          style={{marginBottom:30}}
                          data={data}
                          keyExtractor={item => `${item._id}`}
                          renderItem={({ item }) => {return(<VoucherItem data={item} />)}}
                          showsVerticalScrollIndicator={false}
                          showsHorizontalScrollIndicator={false}
                      />
                  </View>
              </View>
            )}
          </>
      )
}

export default Voucher

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    panelBody: {
        flex: 1,
    }
})
