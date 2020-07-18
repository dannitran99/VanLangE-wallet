import React from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import NumberFormat from 'react-number-format';
const HistoryItem = (props) => {
    const { data,onPress } = props;
    const [date, setDate] = React.useState('');
    const [time, setTime] = React.useState('');
    const [products, setProducts] = React.useState('');
    React.useEffect(() => {
      var date = new Date(data.date);
      setDate(date.getHours()+':'+date.getMinutes() +' ngày '+date.getDate()+'/' +(date.getMonth()+1));
      var time = new Date(data.time);
      setTime(time.getHours()+':'+time.getMinutes() +' ngày '+time.getDate()+'/' +(time.getMonth()+1));
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
          <TouchableOpacity style={styles.panelContainer} onPress={onPress}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                  <View style={styles.panelInfo}>
                  <Text style={{ fontSize: 15, color: '#4d577b', fontWeight: 'bold', }}>{data.username}</Text>
                  <Text numberOfLines={3} style={{ fontSize: 11, color: '#6c6c6c' }}>Sản phẩm: {products}</Text>
                  <Text style={{ fontSize: 11, color: '#6c6c6c', opacity: 0.6 }}>Giờ đặt: {date}</Text>
                  <Text style={{ fontSize: 11, color: '#6c6c6c', opacity: 0.6 }}>Sẽ lấy lúc: {time}</Text>
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
          </TouchableOpacity>
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
