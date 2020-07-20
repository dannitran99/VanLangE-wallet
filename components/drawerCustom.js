import * as React from 'react';
import {StyleSheet,Image, AsyncStorage, Text, View,ImageBackground,Alert  } from 'react-native';
import BackgroundImage from '../assets/blue_background.jpg';
import Logo from '../assets/logo-blue_transparent_cutsize.png';
import { Avatar } from 'react-native-elements'
import { MaterialCommunityIcons, Feather, AntDesign, } from '@expo/vector-icons';
import axios from 'axios';
var jwtDecode = require('jwt-decode');
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import {
    Drawer
} from 'react-native-paper';

function CustomDrawerContent(props) {
  const [username, setUsername] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('');
  const [wallet, setWallet] = React.useState(-1);
  const [point, setPoint] = React.useState(-1);
  React.useEffect(() => {
    AsyncStorage.getItem('userToken', (err, result) => {
      var decoded = jwtDecode(result);
        setUsername(decoded.user);
        setName(decoded.name);
        setEmail(decoded.email);
        setRole(decoded.role);
        setWallet(decoded.wallet);
        setPoint(decoded.point);
    });
  },[]);
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
                              <Text style={[styles.caption,{flex:1,marginTop:5}]}>{email}</Text>

                          </View>
                      </View>

                      <View style={styles.row}>
                        <Text style={styles.user}>UID: {username}</Text>
                        <Text style={styles.caption}>Quyền: {role}</Text>
                      </View>
                  </View>
                </ImageBackground>
              </View>
              <Drawer.Section style={styles.drawerSection}>
                  <DrawerItem
                      icon={({ size }) => (
                          <AntDesign name="home" color='#1f2233' size={size} />
                      )}
                      label="Trang chủ"
                      onPress={() => { props.navigation.navigate('Trang chủ') }}
                      labelStyle={{ color: '#1f2233' }}
                  />
                  <DrawerItem
                      icon={({ size }) => (
                          <AntDesign name="user" color='#1f2233' size={size} />
                      )}
                      label="Danh sách tài khoản"
                      onPress={() => {
                        if(role == 'manager')props.navigation.navigate('Tài khoản');
                        else Alert.alert("Thông báo","Bạn không có quyền truy cập vào mục này!")}}
                      labelStyle={{ color: '#1f2233' }}
                  />
                  <DrawerItem
                      icon={({ size }) => (
                          <AntDesign name="gift" color='#1f2233' size={size} />
                      )}
                      label="Voucher"
                      onPress={() => {
                        if(role == 'manager')props.navigation.navigate('VoucherStack');
                        else Alert.alert("Thông báo","Bạn không có quyền truy cập vào mục này!")}}
                      labelStyle={{ color: '#1f2233' }}
                  />
              </Drawer.Section>
          </DrawerContentScrollView>
          <Drawer.Section style={styles.bottomDrawer}>
            <DrawerItem
                 icon={({ size }) => (
                     <AntDesign name="poweroff" color='#1f2233' size={size} />
                 )}
                 label="Đăng xuất"
                 labelStyle={{ fontWeight: 'bold', color: '#1f2233' }}
                 onPress={()=>{props.navigation.navigate('Đăng xuất')}}
             />
           </Drawer.Section>
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
    user: {
      color:'white',
      fontSize: 14,
      lineHeight: 14,
      flex:1
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom:20,
      paddingHorizontal:10,
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
    },
    bottomDrawer: {
        marginBottom: 20,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
  });

export default CustomDrawerContent;
