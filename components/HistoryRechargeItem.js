import React from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import NumberFormat from 'react-number-format';
const HistoryItem = (props) => {
    const { data } = props;
    const [type, setType] = React.useState('');
    const [date, setDate] = React.useState('');
    React.useEffect(() => {
      switch(data.type){
        case 'recharge':
          setType('Nạp tiền');
          break;
        case 'loan':
          setType('Vay tiền');
          break;
        case 'repay':
          setType('Trả nợ');
          break;
        default:break;
      }
      var date = new Date(data.date);
      setDate(date.getHours()+':'+date.getMinutes() +' ngày '+date.getDate()+'/' +(date.getMonth()+1))
    }, []);
    return (
      <>
          <View style={styles.panelContainer}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                  <View style={styles.panelInfo}>
                  <Text style={{ fontSize: 15, color: '#4d577b', fontWeight: 'bold', }}>{type}</Text>
                  <Text style={{ fontSize: 11, color: '#6c6c6c', opacity: 0.6 }}>{date}</Text>
              </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <NumberFormat
                     value={data.money}
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
