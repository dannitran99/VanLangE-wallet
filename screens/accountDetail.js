import React from 'react'
import { StyleSheet, Text, View ,ScrollView,Image,TouchableOpacity,Dimensions,TextInput,CheckBox} from 'react-native'
import BackgroundOval from '../components/BackgroundOval'
import { Avatar ,Badge,Button  } from 'react-native-elements';
import NumberFormat from 'react-number-format';
import { ConfirmDialog  } from 'react-native-simple-dialogs';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
const AccountDetail = ({navigation,route}) => {
  const [sname, setSname] = React.useState('');
  const [load, setLoad] = React.useState(false);
  const [check, setCheck] = React.useState(false);
  const [wallet, setWallet] = React.useState(-1);
  const [debt, setDebt] = React.useState(-1);
  const [role, setRole] = React.useState('');
  const [pickRole, setPickRole] = React.useState('');
  const [active, setActive] = React.useState(true);
  const [activeDialog, setActiveDialog] = React.useState(false);
  const [openRole, setOpenRole] = React.useState(false);
  const [openRecharge, setOpenRecharge] = React.useState(false);
  const [openRepay, setOpenRepay] = React.useState(false);
  const [checkBox,setCheckBox] = React.useState(false);
  const [pickMoney, setPickMoney] = React.useState('');
  const [pickMoneyPay, setPickMoneyPay] = React.useState('');
  React.useEffect(() => {
      setRole(route.params.data.role);
      setPickRole(route.params.data.role);
      setActive(route.params.data.active);
      setWallet(route.params.data.wallet);
      setDebt(route.params.data.debt);
      let subname = route.params.data.name.split(' ');
      if(subname.length > 1) setSname(subname[0].charAt(0) + subname.reverse()[0].charAt(0));
      else  setSname(subname[0].charAt(0));
  }, []);

    function sendActive(){
      setActiveDialog(false);
      setLoad(true);
      axios.post('https://vlu-ewallet.herokuapp.com/account-manager/active',{
          username:route.params.data.username
      }).then(res =>{
         if(res.data='Success');
          setActive(true);
          setLoad(false);
       }).catch(err =>{
           console.error(err);
        })
    }
    function postNewRole(){
      setLoad(true);
      axios.post('https://vlu-ewallet.herokuapp.com/account-manager/setRole',{
          username:route.params.data.username,
          role:pickRole
      }).then(res =>{
         if(res.data='Success'){
           setRole(pickRole);
           setOpenRole(false);
           setLoad(false);
         }
          setLoad(false);
       }).catch(err =>{
           console.error(err);
        })
    }
    function recharge(){
      setLoad(true);
      var now = new Date();
      axios.post('https://vlu-ewallet.herokuapp.com/account-manager/recharge',{
          username:route.params.data.username,
          money:pickMoney,
          bycash:checkBox,
          date: now.toString()
      }).then(res =>{
         if(res.data.thongbao='Success'){
           setWallet(res.data.data.wallet);
           setDebt(res.data.data.debt)
           setOpenRecharge(false);
           setCheckBox(false);
           setPickMoney('')
           setLoad(false);
         }
         setLoad(false);
       }).catch(err =>{
           console.error(err);
        })
    }
    function repay(){
      setLoad(true);
      var now = new Date();
      axios.post('https://vlu-ewallet.herokuapp.com/account-manager/repay',{
          username:route.params.data.username,
          money:pickMoneyPay,
          date: now.toString()
      }).then(res =>{
         if(res.data.thongbao='Success'){
           setWallet(res.data.data.wallet);
           setDebt(res.data.data.debt)
           setOpenRepay(false);
           setPickMoneyPay('')
           setLoad(false);
         }
         setLoad(false);
       }).catch(err =>{
           console.error(err);
        })
    }
    return (
      <>
          <Spinner
              visible={load}
              color='00b5ec'
              animation='slide'
          />
          <ConfirmDialog
              title="Xác nhận"
              message="Kích hoạt tài khoản này?"
              visible={activeDialog}
              positiveButton={{
                  title: "Đồng ý",
                  onPress: () => sendActive()
              }}
              negativeButton={{
                  title: "Hủy",
                  onPress: () => setActiveDialog(false)
              }}
          />
          <ScrollView style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.container}>
                <BackgroundOval/>
                  <View style={styles.BackgroundContainer}>
                      <View style={{ alignSelf: "center" }}>
                          <View style={styles.profileImage}>
                            {route.params.data.avatar==''?(
                              <Avatar
                               size="xlarge"
                                containerStyle={{backgroundColor:"#BCBEC1"}}
                                rounded
                                title={sname}
                                activeOpacity={0.7}/>
                              ):(
                                <Image source={{uri:route.params.data.avatar}} style={styles.image} resizeMode="center" />
                              )}
                          </View>
                      </View>
                      <View style={styles.infoContainer}>
                          <View style={{flexDirection:'row',padding:5}}>
                              {!active?(<Badge value="Chưa kích hoạt" containerStyle={{marginRight:10}} status="error" />):undefined}

                              <Badge value={role} status="primary" />
                          </View>
                          <Text style={{ color: '#1f2233', fontWeight: "200", fontSize: 23 }}>{route.params.data.name}</Text>
                          <Text style={{ color: '#1683fc', fontSize: 14 }}>{route.params.data.email}</Text>
                      </View>
                      <View  style={{alignItems:'center',flexDirection:'row',justifyContent:'center',marginTop:10}}>
                          <Button
                            title="Lịch sử giao dịch"
                            onPress={()=>navigation.navigate('History',{username:route.params.data.username})}
                          />
                          <Button
                            title="Lịch sử nạp tiền"
                            type="outline"
                            onPress={()=>navigation.navigate('HistoryRecharge',{username:route.params.data.username})}
                          />
                      </View>
                      <View style={styles.balanceContainer}>
                        <View  style={{alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
                          <Text style={{ fontWeight: "500", color: '#77777a', fontSize: 15 }}>Số dư</Text>
                          <NumberFormat
                             value={wallet}
                             displayType={'text'}
                             thousandSeparator={true}
                             suffix={' đ'}
                             renderText={formattedValue => <Text style={{ fontWeight: "bold", color: "#0c1236" , fontSize: 20,marginLeft:5  }}>{formattedValue}</Text>} // <--- Don't forget this!
                           />
                        </View>
                        <View style={{marginLeft:50,alignItems:'center', flexDirection:'row',justifyContent:'center'}}>
                          <Text style={{ fontWeight: "500", color: '#77777a', fontSize: 15 }}>Tồn nợ</Text>
                          <NumberFormat
                             value={debt}
                             displayType={'text'}
                             thousandSeparator={true}
                             suffix={' đ'}
                             renderText={formattedValue => <Text style={{ fontWeight: "bold", color: "#0c1236" , fontSize: 20,marginLeft:5 }}>{formattedValue}</Text>} // <--- Don't forget this!
                           />
                        </View>
                      </View>
                      <View style={styles.setting}>
                        {!active?(
                          <TouchableOpacity onPress={()=>{setActiveDialog(true)}}>
                            <Text style={[styles.text, { color: "#1f2233", fontSize: 18 }]}>Kích hoạt tài khoản</Text>
                          </TouchableOpacity>):undefined}
                        {role !='manager'?(
                          <TouchableOpacity onPress={() => {
                                  if(openRole)setOpenRole(false);
                                  else{setOpenRole(true);setOpenRecharge(false);setOpenRepay(false);}}} >
                              <Text style={[styles.text, { color: "#1f2233", fontSize: 18, marginTop: 18, }]}>Quyền hạn tài khoản</Text>
                          </TouchableOpacity>):undefined}
                          {openRole?(
                            <View style={{marginTop:15 , borderWidth:1,padding:30,width:Dimensions.get('window').width-80,elevation:3,alignItems:'center'}}>
                              <View style={{flexDirection:'row'}}>
                                {pickRole=='market-manager'?(
                                  <TouchableOpacity style={styles.roleBorderOnSet}>
                                    <Text>Quản lý siêu thị</Text>
                                  </TouchableOpacity>
                                ):(
                                  <TouchableOpacity style={styles.roleBorder} onPress={()=>setPickRole('market-manager')}>
                                    <Text>Quản lý siêu thị</Text>
                                  </TouchableOpacity>
                                )}
                                {pickRole=='canteen-manager'?(
                                  <TouchableOpacity style={styles.roleBorderOnSet}>
                                    <Text>Quản lý căn tin</Text>
                                  </TouchableOpacity>
                                ):(
                                  <TouchableOpacity style={styles.roleBorder} onPress={()=>setPickRole('canteen-manager')}>
                                    <Text>Quản lý căn tin</Text>
                                  </TouchableOpacity>
                                )}
                              </View>
                              <View style={{flexDirection:'row'}}>
                                {pickRole=='library-manager'?(
                                  <TouchableOpacity style={styles.roleBorderOnSet}>
                                    <Text>Quản lý thư viện</Text>
                                  </TouchableOpacity>
                                ):(
                                  <TouchableOpacity style={styles.roleBorder} onPress={()=>setPickRole('library-manager')}>
                                    <Text>Quản lý thư viện</Text>
                                  </TouchableOpacity>
                                )}
                                {pickRole=='parking-manager'?(
                                  <TouchableOpacity style={styles.roleBorderOnSet}>
                                    <Text>Quản lý gửi xe</Text>
                                  </TouchableOpacity>
                                ):(
                                  <TouchableOpacity style={styles.roleBorder} onPress={()=>setPickRole('parking-manager')}>
                                    <Text>Quản lý gửi xe</Text>
                                  </TouchableOpacity>
                                )}
                              </View>
                              <View style={{flexDirection:'row',justifyContent:'center'}}>
                                {pickRole=='user'?(
                                  <TouchableOpacity style={styles.roleBorderOnSet}>
                                    <Text>Người dùng</Text>
                                  </TouchableOpacity>
                                ):(
                                  <TouchableOpacity style={styles.roleBorder} onPress={()=>setPickRole('user')}>
                                    <Text>Người dùng</Text>
                                  </TouchableOpacity>
                                )}
                              </View>
                              {role==pickRole?undefined:(
                                <Button containerStyle={{marginTop:10,width:200}}
                                  title="Hoàn tất"
                                  onPress={()=>postNewRole()}
                                />
                              )}
                            </View>):undefined}
                          <TouchableOpacity onPress={() => {
                                  if(openRecharge)setOpenRecharge(false);
                                  else{setOpenRecharge(true);setOpenRole(false);setOpenRepay(false);}}}>
                              <Text style={[styles.text, { color: "#1f2233", fontSize: 18, marginTop: 18, }]}>Nạp tiền</Text>
                          </TouchableOpacity>
                          {openRecharge?(
                            <View style={{marginTop:15, borderWidth:1,padding:30,width:Dimensions.get('window').width-80,elevation:3,alignItems:'center'}}>
                              <View style={{flexDirection:'row'}}>
                                {pickMoney=='50000'?(
                                  <TouchableOpacity style={styles.roleBorderOnSet}>
                                    <Text>50.000đ</Text>
                                  </TouchableOpacity>
                                ):(
                                  <TouchableOpacity style={styles.roleBorder} onPress={()=>setPickMoney('50000')}>
                                    <Text>50.000đ</Text>
                                  </TouchableOpacity>
                                )}
                                {pickMoney=='100000'?(
                                  <TouchableOpacity style={styles.roleBorderOnSet}>
                                    <Text>100.000đ</Text>
                                  </TouchableOpacity>
                                ):(
                                  <TouchableOpacity style={styles.roleBorder} onPress={()=>setPickMoney('100000')}>
                                    <Text>100.000đ</Text>
                                  </TouchableOpacity>
                                )}
                              </View>
                              <View style={{flexDirection:'row'}}>
                                {pickMoney=='200000'?(
                                  <TouchableOpacity style={styles.roleBorderOnSet}>
                                    <Text>200.000đ</Text>
                                  </TouchableOpacity>
                                ):(
                                  <TouchableOpacity style={styles.roleBorder} onPress={()=>setPickMoney('200000')}>
                                    <Text>200.000đ</Text>
                                  </TouchableOpacity>
                                )}
                                {pickMoney=='500000'?(
                                  <TouchableOpacity style={styles.roleBorderOnSet}>
                                    <Text>500.000đ</Text>
                                  </TouchableOpacity>
                                ):(
                                  <TouchableOpacity style={styles.roleBorder} onPress={()=>setPickMoney('500000')}>
                                    <Text>500.000đ</Text>
                                  </TouchableOpacity>
                                )}
                              </View>
                              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                  <Text>Số khác</Text>
                                  <TextInput
                                    value={pickMoney}
                                    style={[styles.roleBorder,{flex:1}]}
                                    placeholder='Số tiền'
                                    keyboardType='number-pad'
                                    onChangeText={setPickMoney}
                                  />
                              </View>
                              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                  <CheckBox
                                    value={checkBox}
                                    onValueChange={setCheckBox}
                                  />
                                  <Text style={styles.label}>Trả trước?</Text>
                              </View>
                              {pickMoney==''?undefined:(
                                <Button containerStyle={{marginTop:10,width:200}}
                                  title="Nạp"
                                  onPress={()=>recharge()}
                                />
                              )}
                            </View>
                          ):undefined}
                          <TouchableOpacity onPress={() => {
                                  if(openRepay)setOpenRepay(false);
                                  else{setOpenRepay(true);setOpenRecharge(false);setOpenRole(false);}}}>
                              <Text style={[styles.text, { color: "#1f2233", fontSize: 18, marginTop: 18, }]}>Trả tiền nợ</Text>
                          </TouchableOpacity>
                          {openRepay?(
                            <View style={{marginTop:15, borderWidth:1,padding:30,width:Dimensions.get('window').width-80,elevation:3,alignItems:'center'}}>
                              <View style={{flexDirection:'row'}}>
                                {pickMoneyPay=='50000'?(
                                  <TouchableOpacity style={styles.roleBorderOnSet}>
                                    <Text>50.000đ</Text>
                                  </TouchableOpacity>
                                ):(
                                  <TouchableOpacity style={styles.roleBorder} onPress={()=>setPickMoneyPay('50000')}>
                                    <Text>50.000đ</Text>
                                  </TouchableOpacity>
                                )}
                                {pickMoneyPay=='100000'?(
                                  <TouchableOpacity style={styles.roleBorderOnSet}>
                                    <Text>100.000đ</Text>
                                  </TouchableOpacity>
                                ):(
                                  <TouchableOpacity style={styles.roleBorder} onPress={()=>setPickMoneyPay('100000')}>
                                    <Text>100.000đ</Text>
                                  </TouchableOpacity>
                                )}
                              </View>
                              <View style={{flexDirection:'row'}}>
                                {pickMoneyPay=='200000'?(
                                  <TouchableOpacity style={styles.roleBorderOnSet}>
                                    <Text>200.000đ</Text>
                                  </TouchableOpacity>
                                ):(
                                  <TouchableOpacity style={styles.roleBorder} onPress={()=>setPickMoneyPay('200000')}>
                                    <Text>200.000đ</Text>
                                  </TouchableOpacity>
                                )}
                                {pickMoneyPay=='500000'?(
                                  <TouchableOpacity style={styles.roleBorderOnSet}>
                                    <Text>500.000đ</Text>
                                  </TouchableOpacity>
                                ):(
                                  <TouchableOpacity style={styles.roleBorder} onPress={()=>setPickMoneyPay('500000')}>
                                    <Text>500.000đ</Text>
                                  </TouchableOpacity>
                                )}
                              </View>
                              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                  <Text>Số khác</Text>
                                  <TextInput
                                    value={pickMoneyPay}
                                    style={[styles.roleBorder,{flex:1}]}
                                    placeholder='Số tiền'
                                    keyboardType='number-pad'
                                    onChangeText={setPickMoneyPay}
                                  />
                              </View>
                              {pickMoneyPay==''?undefined:(
                                <Button containerStyle={{marginTop:10,width:200}}
                                  title="Trả nợ"
                                  onPress={()=>repay()}
                                />
                              )}
                            </View>
                          ):undefined}
                      </View>
                  </View>

              </View>
          </ScrollView>
      </>
    )
}

export default AccountDetail

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
  profileImage: {
      marginTop: -95,
      overflow: 'hidden'
  },
  infoContainer: {
      alignItems: "center",
      alignSelf: "center",
      marginTop: 5,
  },
  BackgroundContainer: {
      alignItems: "center",
      marginTop: 100,
      backgroundColor: '#fff',
      padding: 30,
      borderRadius: 5,
      marginHorizontal: 20,
  },
  balanceContainer: {
      flexDirection:'row',
      alignItems: "center",
      alignSelf: "center",
      marginTop: 30,
  },
  setting: {
      alignItems: "center",
      alignSelf: "center",
      marginTop: 30,
  },
  scrollView: {
      flex: 1,
      backgroundColor: '#fff'
  },
  image: {
   borderRadius: 360,
   width: 150,
   height: 150,
 },
 roleBorder:{
   marginHorizontal:10,
   borderColor:'gray',
   borderWidth:2,
   padding:10,
   borderRadius:30,
   alignItems:'center',
   justifyContent:'center',
   marginVertical:5
 },
 roleBorderOnSet:{
   marginHorizontal:10,
   borderColor:'red',
   borderWidth:2,
   padding:10,
   borderRadius:30,
   alignItems:'center',
   justifyContent:'center',
   marginVertical:5
 },
})
