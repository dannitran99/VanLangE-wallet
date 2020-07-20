import React from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import NumberFormat from 'react-number-format';
const VoucherItem = (props) => {
    const { data } = props;
    return (
      <>
          <View style={styles.panelContainer}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
               <View style={styles.panelInfo}>
               <Text style={{ fontSize: 15, color: '#4d577b', fontWeight: 'bold', }}>{data.name}</Text>
               <Text style={{ fontSize: 11, color: '#6c6c6c', opacity: 0.6 }}>{data.description}</Text>
           </View>
           </View>
           <View style={{ alignItems: 'center', }}>
               <NumberFormat
                  value={data.exchange}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={' đ'}
                  renderText={formattedValue => <Text style={{ fontSize: 18, color: '#1f2233', marginHorizontal: 2, fontWeight: 'bold' }}>Nhận: {formattedValue}</Text>} // <--- Don't forget this!
                />
               <NumberFormat
                  value={data.point}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={' VPoint'}
                  renderText={formattedValue => <Text style={{ fontSize: 18, color: '#1f2233', marginHorizontal: 2, fontWeight: 'bold' }}>Điểm: {formattedValue}</Text>} // <--- Don't forget this!
                />
           </View>
          </View>
      </>
    )
}

export default VoucherItem

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
  panelInfo: {
      paddingHorizontal: 15,
      flex: 1,
  },
})
