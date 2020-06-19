import * as React from 'react';
import {StyleSheet,Image, AsyncStorage, Text, View,ImageBackground  } from 'react-native';
import BackgroundImage from '../assets/blue_background.jpg';
import Logo from '../assets/logo-blue_transparent_cutsize.png'
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
      axios.post('https://vlu-ewallet.herokuapp.com/login/jwtverify', {
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
    <View style={{flex:1}}>
     <DrawerContentScrollView {...props}>
              <View style={styles.drawerContent}>
                <ImageBackground source={BackgroundImage} style={{flex:1}}>
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
                </ImageBackground>
              </View>
              <DrawerItemList {...props} />
          </DrawerContentScrollView>
          <View style={styles.infoDiv}>
              <Image source={Logo} style={styles.logo}/>
              <Text style={styles.info}>Phát triển và vận hành bởi Team#4</Text>
          </View>
        </View>
  );
}


const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
      paddingBottom:30
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      color:'white',
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      color:'white',
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      paddingBottom:15,
      flex:1,
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
    },
    infoDiv:{
      alignItems:'center',
      paddingBottom:3
    },
    info:{
      fontSize:10,
      color:'#9DA9B2'
    },
    logo:{
      width:130,
      height:50
    }
  });

export default CustomDrawerContent;
