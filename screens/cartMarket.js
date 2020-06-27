import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import LottieView from 'lottie-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
export default function NewCart({navigation,route}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [products,setProducts] = useState([]);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    setProducts(route.params.products)
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

  };

  if (hasPermission === null) {
    return <Text>Kiểm tra thông tin cấp quyền</Text>;
  }
  if (hasPermission === false) {
    return <Text>Không thể dùng camera</Text>;
  }

  return (

    <View
      style={styles.container}>
      <BarCodeScanner
        style={{position:'absolute'}}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13,
                       BarCodeScanner.Constants.BarCodeType.ean8,
                      ]}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {isFocused ?(<LottieView style={{width:300}} source={require('../anim/4692-scanner.json')} autoPlay loop />) :<View/>}

    </View>
  );
}


const styles = StyleSheet.create({
    container:{
       alignItems:'center',
       flex: 1,
       justifyContent: 'center',
    }
});
