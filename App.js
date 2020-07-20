import * as React from 'react';
import {StyleSheet,Image,TouchableHighlight, AsyncStorage, Button, Text, TextInput, View ,Alert,TouchableOpacity} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

import CustomDrawerContent from './components/drawerCustom'

import axios from 'axios';

import Home from './screens/home';
import AccountStack from './screens/accountStack';
import Voucher from './screens/voucher';
import AddVoucher from './screens/addVoucher'
import PlashScreenImage from './assets/logo_transparent.png';
const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View style={styles.splashBackground} >
      <Image style={styles.categoryImage} source={PlashScreenImage}/>
    </View>
  );
}

function Logout({navigation}) {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Bạn có chắc chắn muốn đăng xuất?</Text>
      <TouchableHighlight style={[styles.buttonLogoutContainer, styles.loginButton]}
      onPress={()=>{
        navigation.goBack();
        signOut();}} >
        <Text style={styles.loginText}>Đăng xuất</Text>
      </TouchableHighlight>
      <TouchableHighlight style={[styles.buttonLogoutContainer, styles.cancelButton]}
      onPress={()=>{navigation.goBack()}}>
        <Text>Quay lại</Text>
      </TouchableHighlight>
    </View>
  );
}

function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { signIn } = React.useContext(AuthContext);
  const [load, setLoad] = React.useState(false);
  return (
    <View style={styles.container}>
      <Spinner
          visible={load}
          color='00b5ec'
          animation='slide'
        />
     <View style={styles.inputContainer}>
       <Image style={styles.inputIcon} source={{uri: 'https://cdn4.iconfinder.com/data/icons/eldorado-user/40/user-512.png'}}/>
       <TextInput style={styles.inputs}
           placeholder="Tài khoản"
           underlineColorAndroid='transparent'
           value={username}
           onChangeText={setUsername}/>
     </View>

     <View style={styles.inputContainer}>
       <Image style={styles.inputIcon} source={{uri: 'https://cdn0.iconfinder.com/data/icons/mono2/100/key-512.png'}}/>
       <TextInput style={styles.inputs}
           placeholder="Mật khẩu"
           secureTextEntry={true}
           underlineColorAndroid='transparent'
           value={password}
           onChangeText={setPassword}/>
     </View>

     <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
     onPress={() =>{
       setLoad(true);
       if(username == "" ||password == ""){
          setLoad(false);
          return Alert.alert("Thông báo","Tài khoản hoặc mật khẩu không được bỏ trống!")}
       axios.post('https://vlu-ewallet.herokuapp.com/login/login', {
          username: username,
          password: password
        }).then(res =>{
          if(res.data.thongbao != 'Success' ) {
            setLoad(false);
            Alert.alert("Thông báo",res.data.thongbao);
          }else{
              setLoad(false);
              var serverToken = res.data.token;
              signIn({ serverToken });
          }
        }).catch(err =>{
            console.error(err);
          })
       }} >
       <Text style={styles.loginText}>Đăng nhập</Text>
     </TouchableHighlight>
    </View>
  );
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        AsyncStorage.setItem('userToken',data.serverToken);
        dispatch({ type: 'SIGN_IN', token: data.serverToken });
      },
      signOut: () => {
        AsyncStorage.removeItem('userToken');
        dispatch({ type: 'SIGN_OUT' });}
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
          {state.isLoading ? (
              <Stack.Navigator>
            <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}} />
            </Stack.Navigator>
          ) : state.userToken == null ? (
              <Stack.Navigator>
                <Stack.Screen
                  name="SignIn"
                  component={SignInScreen}
                  options={{headerShown: false}}
                />
              </Stack.Navigator>
          ) : (
            <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />}>
               <Drawer.Screen name="Trang chủ" component={Home}/>
               <Drawer.Screen name="Đăng xuất" component={Logout}/>
               <Drawer.Screen name="Tài khoản" component={AccountStack}/>
               <Drawer.Screen name="VoucherStack" component={VoucherStack}/>
            </Drawer.Navigator>
          )}

      </NavigationContainer>
    </AuthContext.Provider>
  );
  function VoucherStack({navigation}) {
    return (
      <Stack.Navigator>
         <Stack.Screen name="Voucher" component={Voucher}
           options={{
               headerRight:() => (
                 <TouchableOpacity onPress={() => navigation.navigate('Thêm Voucher')}>
                   <Ionicons name='md-add' size={30} style={{ paddingHorizontal: 20 }}/>
                 </TouchableOpacity>
               ),
               headerLeft: () => (
                   <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                       <Feather name="menu" size={25} color="#000" style={{ paddingHorizontal: 20 }} />
                   </TouchableOpacity>
               )
           }}/>
          <Stack.Screen name="Thêm Voucher" component={AddVoucher}/>
      </Stack.Navigator>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#DEEBF6',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  buttonLogoutContainer: {
    marginTop:20,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:150,
    borderRadius:30,
  },
  cancelButton: {
    backgroundColor: "#e6f2ff",
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  },
  splashBackground:{
    backgroundColor:"#4388D6",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryImage:{
    width:350,
    height:350,
    backgroundColor:'transparent'
  }
});
