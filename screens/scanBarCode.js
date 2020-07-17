import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import LottieView from 'lottie-react-native';
export default function BarcodeScan({navigation,route}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    switch(route.params.screen){
        case 'addProduct' :
          navigation.navigate('Thêm sản phẩm', { barcode: data });
          break;
        case 'editProduct' :
          navigation.navigate('Sửa sản phẩm', { barcode: data });
          break;
        case 'addCanteen' :
          navigation.navigate('Thêm sản phẩm căn tin', { barcode: data });
          break;
        case 'editCanteen' :
          navigation.navigate('Sửa sản phẩm căn tin', { barcode: data });
          break;
        case 'addLibrary' :
          navigation.navigate('Thêm sản phẩm thư viện', { barcode: data });
          break;
        case 'editLibrary' :
          navigation.navigate('Sửa sản phẩm thư viện', { barcode: data });
          break;
        default: break;
    }
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
      <LottieView style={{width:300}} source={require('../anim/4692-scanner.json')} autoPlay loop />
    </View>
  );
}


const styles = StyleSheet.create({
    container:{
       alignItems:'center',
       flex: 1,
       justifyContent: 'center',
    },
    icon:{
      position:'absolute',
      alignItems:'center',
      justifyContent:'center'
    }
});
