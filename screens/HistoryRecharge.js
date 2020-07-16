import React from 'react'
import { StyleSheet, Text, View, Image, StatusBar,AsyncStorage,FlatList } from 'react-native'
import axios from 'axios';
import HistoryRechargeItem from '../components/HistoryRechargeItem';
import Spinner from 'react-native-loading-spinner-overlay';
const HistoryScreen = ({navigation,route}) => {
  const [username, setUsername] = React.useState(route.params.username);
  const [data, setData] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  React.useEffect(() => {
    setLoad(true);
    axios.post('https://vlu-ewallet.herokuapp.com/account-manager/historyRecharge',{
      username:username
    }).then(res =>{
       setData(res.data);
       setLoad(false);
     }).catch(err =>{
         console.error(err);
      })
  }, []);
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
                          renderItem={({ item }) => {return(<HistoryRechargeItem data={item} />)}}
                          showsVerticalScrollIndicator={false}
                          showsHorizontalScrollIndicator={false}
                      />
                  </View>
              </View>
            )}
          </>
      )
}

export default HistoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    panelBody: {
        flex: 1,
    },
    searchContainer: {
        backgroundColor: '#fff',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
