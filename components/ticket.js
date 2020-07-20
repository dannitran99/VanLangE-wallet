import React from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import NumberFormat from 'react-number-format';
const Ticket = (props) => {
    const { data,onPress } = props;
    return (

        <View style={styles.panelContainer}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                <View style={[styles.panelInfo,{flex:1}]}>
                  <Text style={{ fontSize: 15, color: '#4d577b', fontWeight: 'bold', }}>ID:{data.id}</Text>
                  {data.type=='moto'?(
                    <Text style={{ fontSize: 15, color: '#4d577b', fontWeight: 'bold', }}>Xe máy</Text>
                  ):(
                    <Text style={{ fontSize: 15, color: '#4d577b', fontWeight: 'bold', }}>Xe đạp</Text>
                  )}
                </View>
                <View style={styles.panelInfo}>
                {data.active?(
                  <Text style={{ fontSize: 15, color: '#4d577b', fontWeight: 'bold', }}>Đang sử dụng</Text>
                ):(
                  <Text style={{ fontSize: 15, color: '#4d577b', fontWeight: 'bold', }}>Chưa dùng</Text>
                )}
                {data.paid?(
                  <Text style={{ fontSize: 15, color: '#4d577b', fontWeight: 'bold', }}>Đã thanh toán</Text>
                ):(
                  <Text style={{ fontSize: 15, color: '#4d577b', fontWeight: 'bold', }}>Chưa thanh toán</Text>
                )}
                </View>
            </View>
        </View>
    )
}

export default Ticket

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
  },
})
