import React from 'react'
import { StyleSheet, View, Dimensions ,Image} from 'react-native'
const w = Dimensions.get('window').width+40;

const BackgroundOval = () => {
    return (
        <View style={styles.container} >
            <Image style={{flex:1,  width: w,aspectRatio: 1,borderRadius: 40}} source={require('../assets/blue_background_account.jpg')}/>
        </View>
    )
}

export default BackgroundOval

const styles = StyleSheet.create({
    container: {
        width: w,
        aspectRatio: 1,
        position: 'absolute',
        top:-20
    }
})
