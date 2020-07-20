import React from 'react'
import { StyleSheet, Text, View, TextInput, StatusBar,FlatList } from 'react-native'
import axios from 'axios';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import TicketPrice from '../components/ticketPrice';
import Ticket from '../components/ticket';
import Spinner from 'react-native-loading-spinner-overlay';
const Moto = ({navigation}) => {
  const [data, setData] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const [ticket, setTicket] = React.useState([]);
  const [type, setType] = React.useState('');
  const [name, setName] = React.useState('');
  const [newPrice, setNewPrice] = React.useState('');
  const [dialogVisible, setDialogVisible] = React.useState(false);
  React.useEffect(() => {
    setLoad(true);
    axios.get('https://vlu-ewallet.herokuapp.com/temp/getParkingPrice').then(res =>{
       setData(res.data);
       setLoad(false);
     }).catch(err =>{
         console.error(err);
      })
      axios.get('https://vlu-ewallet.herokuapp.com/temp/getParkingTicket').then(res =>{
         setTicket(res.data);
       }).catch(err =>{
           console.error(err);
        })
  }, []);
  function postnewPrice(){
    setDialogVisible(false);
    setLoad(true);
    axios.post('https://vlu-ewallet.herokuapp.com/temp/editParkingPrice',{
      type:type,
      price:newPrice
    }).then(res =>{
       setData(res.data);
       setLoad(false);
     }).catch(err =>{
         console.error(err);
      })
  }
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
                      <ConfirmDialog
                          title={name}
                          visible={dialogVisible}
                          positiveButton={{
                              title: "OK",
                              onPress: () => postnewPrice()
                          }}
                          negativeButton={{
                               title: "Hủy",
                               onPress: () => setDialogVisible(false)
                           }} >
                          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                              <Text>Giá</Text>
                              <TextInput
                                value={newPrice}
                                style={[styles.roleBorder,{flex:1}]}
                                placeholder='Số tiền'
                                keyboardType='number-pad'
                                onChangeText={setNewPrice}
                              />
                          </View>
                      </ConfirmDialog>
                      <View style={styles.panelBody}>
                      <Text style={{marginLeft:20,marginTop:10, fontSize:20,fontWeight:'bold'}}>Bảng giá gửi xe</Text>
                      <FlatList
                          data={data}
                          keyExtractor={item => `${item._id}`}
                          renderItem={({ item }) => {return(<TicketPrice data={item} onPress={()=>{
                            setDialogVisible(true);
                            if(item.type=='moto'){
                              setName('Xe máy');
                            }else{
                              setName('Xe đạp')
                            }
                            setType(item.type);
                            setNewPrice(item.price+'')
                          }}/>)}}
                          showsVerticalScrollIndicator={false}
                          showsHorizontalScrollIndicator={false}
                      />
                      <Text style={{marginLeft:20,marginTop:10, fontSize:20,fontWeight:'bold'}}>Thông tin thẻ gửi xe</Text>
                      <FlatList
                          style={{marginBottom:30}}
                          data={ticket}
                          keyExtractor={item => `${item._id}`}
                          renderItem={({ item }) => {return(<Ticket data={item} />)}}
                          showsVerticalScrollIndicator={false}
                          showsHorizontalScrollIndicator={false}
                      />
                  </View>
              </View>
            )}
          </>
      )
}

export default Moto

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
    },
    roleBorder:{
      marginHorizontal:10,
      borderColor:'gray',
      borderWidth:2,
      padding:10,
      borderRadius:30,
      alignItems:'center',
      justifyContent:'center',
      marginVertical:5
    },
})
