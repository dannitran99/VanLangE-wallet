import React from 'react';
import { StyleSheet,View,Text ,TouchableOpacity} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Categories from './categories';
import AddProduct from './addProduct';
import AddCanteenProduct from './addCanteenProduct';
import AddLibraryProduct from './addLibraryProduct';
import EditProduct from './editProduct';
import EditCanteenProduct from './editCanteenProduct';
import EditLibraryProduct from './editLibraryProduct';
import AllOrder from './allOrder';
import OrderDetail from './orderDetail';
import CameraApp from './camera';
import Market from './market';
import Canteen from './canteen';
import Library from './library';
import Motocycle from './motocycle';
import StatisticMarket from './statisticMarket';
import StatisticCanteen from './statisticCanteen';
import StatisticLibrary from './statisticLibrary';
import StatisticParking from './statisticParking';
import Scan from './scanBarCode';
import NewCart from './newCart';
import CartMarket from './cartMarket';
import Payment from './payment';
import ButtonQR from '../components/buttonQR';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

export default class Home extends React.Component {
  render(){
    return(
      <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Danh mục') {
                iconName = focused
                  ? 'ios-list': 'ios-list-box';
              } else if (route.name === 'Thống kê') {
                iconName = 'ios-stats';
              }
              else if (route.name === 'Thanh toán QR') {
                return <ButtonQR navigation={this.props.navigation} />;
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}>
         <Tab.Screen name="Danh mục" component={StackCate}/>
         <Tab.Screen name="Thanh toán QR" component={StackScan}
              options={{
                tabBarLabel:''
              }}
              listeners={{
              tabPress: (e) => {
                e.preventDefault(); // — > the main part
              },
            }}
         />
         <Tab.Screen name="Thống kê" component={StackStat}/>
      </Tab.Navigator>
    );
  }
}


function StackCate({navigation}) {
  return (
    <Stack.Navigator>
       <Stack.Screen name="Danh mục" component={Categories}
       options={{
         headerTransparent: true,
         headerTitle: null,
          headerLeft:() => (
            <TouchableOpacity style={styles.icon} onPress={() => navigation.toggleDrawer()}>
              <Ionicons name='ios-menu' size={30}/>
            </TouchableOpacity>
          ),
        }}/>

        <Stack.Screen name="Siêu thị" component={Market}
        options={{
           headerRight:() => (
             <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Thêm sản phẩm')}>
               <Ionicons name='md-add' size={30} />
             </TouchableOpacity>
           ),
         }}/>
        <Stack.Screen name="Căn tin" component={Canteen}
        options={{
           headerRight:() => (
             <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Thêm sản phẩm căn tin')} >
               <Ionicons name='md-add' size={30} />
             </TouchableOpacity>
           ),
         }}/>
        <Stack.Screen name="Thư viện" component={Library}
        options={{
           headerRight:() => (
             <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Thêm sản phẩm thư viện')} >
               <Ionicons name='md-add' size={30} />
             </TouchableOpacity>
           ),
         }}/>
        <Stack.Screen name="Gửi xe" component={Motocycle}/>
        <Stack.Screen name="Thêm sản phẩm" component={AddProduct}/>
        <Stack.Screen name="Sửa sản phẩm" component={EditProduct} options={({ route }) => ({ title: route.params.detail.name })}/>
        <Stack.Screen name="Camera" component={CameraApp}/>
        <Stack.Screen name="Scan" component={Scan}/>
        <Stack.Screen name="Thêm sản phẩm căn tin" component={AddCanteenProduct}/>
        <Stack.Screen name="Sửa sản phẩm căn tin" component={EditCanteenProduct} options={({ route }) => ({ title: route.params.detail.name })}/>
        <Stack.Screen name="Thêm sản phẩm thư viện" component={AddLibraryProduct}/>
        <Stack.Screen name="Sửa sản phẩm thư viện" component={EditLibraryProduct} options={({ route }) => ({ title: route.params.detail.name })}/>
        <Stack.Screen name="Đơn đặt hàng" component={AllOrder}/>
        <Stack.Screen name="Chi tiết đơn hàng" component={OrderDetail}/>
    </Stack.Navigator>
  );
}

function StackScan({navigation}) {
  return (
    <Stack.Navigator>
       <Stack.Screen name="Tạo giỏ hàng" component={NewCart}
        options={{headerShown: false}}/>
      <Stack.Screen name="Giỏ hàng" component={CartMarket}/>
      <Stack.Screen name="Thanh toán" component={Payment}/>
    </Stack.Navigator>
  );
}



function StackStat({navigation}) {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Thống kê siêu thị" component={StatisticMarket}
        options={{
           title:'Siêu thị',
         }}/>
      <TopTab.Screen name="Thống kê căn tin" component={StatisticCanteen}
        options={{
          title:'Căn tin',
        }}/>
      <TopTab.Screen name="Thống kê thư viện" component={StatisticLibrary}
        options={{
           title:'Thư viện',
         }}/>
      <TopTab.Screen name="Thống kê gửi xe" component={StatisticParking}
        options={{
          title:'Giữ xe',
        }}/>
    </TopTab.Navigator>
  );
}


const styles = StyleSheet.create({
  icon: {
    marginLeft:20,
    marginRight:20
  }
})
