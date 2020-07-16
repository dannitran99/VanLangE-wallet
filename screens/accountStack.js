import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import AllAccount from './allAccount';
import AccountDetail from './accountDetail';
import History from './HistoryScreen';
import HistoryRecharge from './HistoryRecharge';

const Stack = createStackNavigator();
const AccountStack = ({navigation}) => {


    return(
      <Stack.Navigator>
          <Stack.Screen name="Account" component={AllAccount}
              options={{
                  headerTitle: "Tài khoản",
                  headerLeft: () => (
                      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                          <Feather name="menu" size={25} color="#000" style={{ paddingHorizontal: 20 }} />
                      </TouchableOpacity>
                  )
              }}
          />
          <Stack.Screen name="AccountDetail" component={AccountDetail}
              options={{
                  headerTitle: "Chi tiết Tài khoản",
              }}
          />
          <Stack.Screen name="History" component={History}
              options={{
                  headerTitle: "Lịch sử giao dịch",
              }}
          />
          <Stack.Screen name="HistoryRecharge" component={HistoryRecharge}
              options={{
                  headerTitle: "Lịch sử nạp tiền",
              }}
          />
      </Stack.Navigator>
    );

}


export default AccountStack
