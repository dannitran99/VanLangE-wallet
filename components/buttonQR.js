import * as React from 'react';
import {StyleSheet ,View ,TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
function ButtonQR({navigation}) {
  const buttonSize=new Animated.Value(1);
  const isFocused = useIsFocused();
  const handleAnim=()=>{
        Animated.sequence([
            Animated.timing(buttonSize,{
              toValue:0.9,
              duration:150
            }),
            Animated.timing(buttonSize,{
              toValue:1,
            }),
        ]).start();
        setTimeout(()=>navigation.navigate('Thanh toán QR'), 300);
  }
  const styleSize = {
    transform:[{scale:buttonSize}]
  }
  return (
       <View style={styles.container}>
        <Animated.View style={[styles.button,styleSize]}>
          <TouchableOpacity onPress={handleAnim} underlayColor='#4388D6'>
          {isFocused ?(<LottieView style={{width:65}} source={require('../anim/511-money.json')} autoPlay loop />) :(
               <LottieView style={{width:65}} source={require('../anim/511-money.json')} autoPlay loop />)}
          </TouchableOpacity>
        </Animated.View>
       </View>
  );
}
const styles = StyleSheet.create({
    container:{
       position:'absolute',
       alignItems:'center'
    },
    button:{
      backgroundColor:"#4388D6",
      alignItems:'center',
      justifyContent:'center',
      width:72,
      height:72,
      borderRadius:36,
      position:'absolute',
      top:-45,
      borderWidth:3,
      borderColor:'#FFF',
      elevation:4
    },
});
export default ButtonQR;
