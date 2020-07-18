import React from 'react'
import { StyleSheet, Text, View,FlatList } from 'react-native'
import OrderItem from '../components/orderItem';
const AllOrder = ({navigation,route}) => {
  const [data, setData] = React.useState(route.params.data);

  return (
          <>
              <View style={styles.container}>
                  <View style={styles.panelBody}>
                      <FlatList
                          style={{marginBottom:30}}
                          data={data}
                          keyExtractor={item => `${item._id}`}
                          renderItem={({ item }) => {return(<OrderItem data={item} onPress={()=>{navigation.navigate('Chi tiết đơn hàng',{data:item})}} />)}}
                          showsVerticalScrollIndicator={false}
                          showsHorizontalScrollIndicator={false}
                      />
                  </View>
              </View>
          </>
      )
}

export default AllOrder

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    panelBody: {
        flex: 1,
    },
})
