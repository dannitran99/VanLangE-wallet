import * as React from 'react';
import {StyleSheet,Image, AsyncStorage, Text, View } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  Drawer
} from '@react-navigation/drawer';

import axios from 'axios';

function CustomDrawerContent(props) {
  const [username, setUsername] = React.useState('');
  const [name, setName] = React.useState('');
  const [wallet, setWallet] = React.useState(-1);
  const [point, setPoint] = React.useState(-1);
  React.useEffect(() => {
    AsyncStorage.getItem('userToken', (err, result) => {
      axios.post('http://192.168.1.9:1234/jwtverify', {
         token: result
       }).then(res =>{
         setUsername(res.data.user);
         setName(res.data.name);
         setWallet(res.data.wallet);
         setPoint(res.data.point);
       }).catch(err =>{
           console.error(err);
         })
    });
  }, []);
  return (
     <DrawerContentScrollView {...props}>
              <View style={styles.drawerContent}>
                  <View style={styles.userInfoSection}>
                      <View style={{flexDirection:'row',marginTop: 15}}>
                          <Image style={styles.inputIcon} source={{uri: 'https://cdn4.iconfinder.com/data/icons/eldorado-user/40/user-512.png'}}/>
                          <View style={{marginLeft:15, flexDirection:'column'}}>
                              <Text style={styles.title}>{name}</Text>
                              <Text style={styles.caption}>{username}</Text>
                          </View>
                      </View>

                      <View style={styles.row}>
                          <View style={styles.section}>
                              <Text style={[styles.paragraph, styles.caption]}>{wallet}</Text>
                              <Text style={styles.caption}>VNĐ</Text>
                          </View>
                          <View style={styles.section}>
                              <Text style={[styles.paragraph, styles.caption]}>{point}</Text>
                              <Text style={styles.caption}>VPoints</Text>
                          </View>
                      </View>
                  </View>
              </View>
              <DrawerItemList {...props} />
          </DrawerContentScrollView>
  );
}


const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
      marginBottom:20
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    inputIcon:{
      width:30,
      height:30,
      marginTop:8,
      marginLeft:15,
      justifyContent: 'center'
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    }
  });

export default CustomDrawerContent;
