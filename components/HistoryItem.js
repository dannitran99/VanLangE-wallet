import React from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import NumberFormat from 'react-number-format';
import Market from '../assets/market.png';
import Food from '../assets/food.png';
import Book from '../assets/book.png';
import Bike from '../assets/bike.png';
const HistoryItem = (props) => {
    const { data } = props;
    const [type, setType] = React.useState('');
    const [date, setDate] = React.useState('');
    const [products, setProducts] = React.useState('');
    const [icon, setIcon] = React.useState('');
    React.useEffect(() => {
      switch(data.type){
        case 'market':
          setType('Siêu thị');
          break;
        case 'library':
          setType('Thư viện');
          break;
        case 'canteen':
          setType('Căn tin');
          break;
        case 'bike':
          setType('Giữ xe');
          break;
        default:break;
      }
      var date = new Date(data.date);
      setDate(date.getHours()+':'+date.getMinutes() +' ngày '+date.getDate()+'/' +(date.getMonth()+1))
      var product = ''
      for(let i=0; i < data.cartItem.length; i++){
        if(i>3){
          product += ',...';
          break;
        }
        if(data.cartItem[i].amount != 0){
          if(i>0)product += ', '+ data.cartItem[i].name;
          else product +=  data.cartItem[i].name;
        }else continue;
      }
      setProducts(product);
    }, []);
    return (
      <>
          <View style={styles.panelContainer}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                  <View>
                    {data.type=='market'?(<Image source={Market} style={styles.panelAvatar} />):(undefined)}
                    {data.type=='library'?(<Image source={Book} style={styles.panelAvatar} />):(undefined)}
                    {data.type=='canteen'?(<Image source={Food} style={styles.panelAvatar} />):(undefined)}
                    {data.type=='bike'?(<Image source={Bike} style={styles.panelAvatar} />):(undefined)}
                  </View>
                  <View style={styles.panelInfo}>
                  <Text style={{ fontSize: 15, color: '#4d577b', fontWeight: 'bold', }}>{type}</Text>
                  <Text style={{ fontSize: 11, color: '#6c6c6c', opacity: 0.6 }}>{date}</Text>
                  <Text numberOfLines={3} style={{ fontSize: 11, color: '#6c6c6c' }}>{products}</Text>
              </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <NumberFormat
                     value={data.price}
                     displayType={'text'}
                     thousandSeparator={true}
                     suffix={' đ'}
                     renderText={formattedValue => <Text style={{ fontSize: 18, color: '#1f2233', marginHorizontal: 2, fontWeight: 'bold' }}>{formattedValue}</Text>} // <--- Don't forget this!
                   />
              </View>
          </View>
      </>
    )
}

export default HistoryItem

const styles = StyleSheet.create({
  panelContainer: {
      borderWidth: 0.8,
      borderColor: '#666',
      padding: 14,
      borderRadius: 6,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
      marginHorizontal: 15,
      marginTop: 15,
  },
  panelAvatar: {
      width: 50,
      height: 50,
      borderRadius: 100,
  },
  panelInfo: {
      paddingHorizontal: 15,
      flex: 1,
  },
})
