import React from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import NumberFormat from 'react-number-format';
const TicketPrice = (props) => {
    const { data,onPress } = props;
    return (
      <>
          <TouchableOpacity style={styles.panelContainer} onPress={onPress}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                  <View style={styles.panelInfo}>
                  {data.type=='moto'?(
                    <Text style={{ fontSize: 15, color: '#4d577b', fontWeight: 'bold', }}>Xe máy</Text>
                  ):(
                    <Text style={{ fontSize: 15, color: '#4d577b', fontWeight: 'bold', }}>Xe đạp</Text>
                  )}
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

export default TicketPrice

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
