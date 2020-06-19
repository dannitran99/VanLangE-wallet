import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function QRScan() {
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
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <Ionicons style={styles.icon} name='ios-qr-scanner' size={300} color='#FFF' />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
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
