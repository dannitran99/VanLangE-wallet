import React from 'react';
import { StyleSheet,View,Text } from 'react-native';

export default class Moto extends React.Component {
  render(){
    return(
      <View style = {styles.container}>
        <Text>Moto</Text>
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
