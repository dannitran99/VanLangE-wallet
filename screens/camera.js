import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet,View,Text,TouchableOpacity,Alert} from 'react-native';

export default class CameraScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    hasPermission: null,
    type: Camera.Constants.Type.back,
  }
  }
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }
  takePicture = async () => {
  if (this.camera) {
    let photo = await this.camera.takePictureAsync({quality:0.3,base64:true});
    if(photo.width > 500) return Alert.alert('Thông báo','Không thể thêm ảnh!')
    switch(this.props.route.params.screen){
        case 'addProduct' :
          this.props.navigation.navigate('Thêm sản phẩm', { post: photo.base64 });
          break;
        case 'editProduct' :
          this.props.navigation.navigate('Sửa sản phẩm', { post: photo.base64 });
          break;
        default: break;
    }

  }
}
  render(){
    const { hasPermission } = this.state
      if (hasPermission === null) {
        return <View />;
      } else if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      } else {
        return (
            <View style={{ flex: 1}}>
              <Camera style={{ flex: 1 }}pictureSize='320x240' type={this.state.cameraType}
              ref={ref => {this.camera = ref}}>
                <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
                    <View style={styles.buttonCam}/>
                    <TouchableOpacity style={styles.buttonCam} onPress={this.takePicture.bind(this)}>
                    <FontAwesome
                        name="camera"
                        style={{ color: "#fff", fontSize: 40}}
                    />
                    </TouchableOpacity>
                    <View  style={styles.buttonCam}/>
                </View>
              </Camera>

          </View>

        );
      }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonCam:{
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
  }
})
