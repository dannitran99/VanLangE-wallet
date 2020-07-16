import React from 'react'
import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native';
import { Avatar ,Badge} from 'react-native-elements';
import {  AntDesign } from '@expo/vector-icons';
const ProfileItem = (props) => {
  const{data,onPress} = props;
  const [sname, setSname] = React.useState('');
  const [role, setRole] = React.useState('');
  React.useEffect(() => {
      let subname = data.name.split(' ');
      if(subname.length > 1) setSname(subname[0].charAt(0) + subname.reverse()[0].charAt(0));
      else  setSname(subname[0].charAt(0));
      // switch (data.role) {
      //   case 'manager':
      //     setRole('Quản lý');
      //     break;
      //   case 'market-manager':
      //     setRole('QL siêu thị');
      //     break;
      //   case 'canteen-manager':
      //     setRole('QL căn tin');
      //     break;
      //   case 'library-manager':
      //     setRole('QL thư viện');
      //     break;
      //   case 'parking-manager':
      //     setRole('QL gửi xe');
      //     break;
      //   case 'user':
      //     setRole('Người dùng');
      //     break;
      //   default:break;
      //
      // }
  }, []);
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          {data.avatar==''?(
            <Avatar
             size="medium"
              containerStyle={{backgroundColor:"#BCBEC1"}}
              rounded
              title={sname}
              activeOpacity={0.7}/>
            ):(
            <Image source={{uri:data.avatar}} style={styles.image} resizeMode="center" />
          )}
          <View style={styles.content}>
            <Text style={{fontSize:15}}>{data.username}</Text>
            <Text style={{marginTop:2,color:'#A8B2BA'}}>{data.name}</Text>
          </View>
          <View style={{justifyContent:'center'}}>
            <View style={{flexDirection:'row'}}>
              {!data.active?(<Badge value="Chưa kích hoạt" status="error" />):undefined}
              {data.role=='manager'?(<Badge value='Quản lý' status="primary" />):undefined}
              {data.role=='market-manager'?(<Badge value='QL siêu thị' status="primary" />):undefined}
              {data.role=='canteen-manager'?(<Badge value='QL căn tin' status="primary" />):undefined}
              {data.role=='library-manager'?(<Badge value='QL thư viện' status="primary" />):undefined}
              {data.role=='parking-manager'?(<Badge value='QL gửi xe' status="primary" />):undefined}
              {data.role=='user'?(<Badge value='Người dùng' status="primary" />):undefined}
              <AntDesign  style={{marginLeft:5,marginTop:2}}name="right" color='#A8B2BA' size={10} />
            </View>
          </View>
        </View>
        <View
          style={{
            paddingTop:5,
            borderBottomColor: '#cfcfcf',
            borderBottomWidth: 1,
          }}
        />
      </TouchableOpacity>
    );

}



const styles = StyleSheet.create({
  container:{
    paddingHorizontal:20,
    padding:10,
    flexDirection:'row',
    flex:1
  },
  image: {
   borderRadius: 360,
   width: 50,
   height: 50,
 },
 content:{
   flex:1,
   justifyContent:'center',
   paddingLeft:10
 }
})
export default ProfileItem
