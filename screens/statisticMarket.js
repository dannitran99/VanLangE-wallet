import React from 'react';
import { StyleSheet,View,Text } from 'react-native';
import Chart from '../components/Chart'

export default class StatisticMarket extends React.Component {
  render(){
    const type = 'market';
    return(
      <View style = {styles.container}>
        <Chart dataa={type}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
