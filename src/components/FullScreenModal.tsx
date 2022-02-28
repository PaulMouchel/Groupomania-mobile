import React, { FC } from 'react'
import IFullScreenModal from '../interfaces/IFullScreenModal'
import { View, StyleSheet, TouchableOpacity, Dimensions, Modal } from 'react-native'

const { height, width } = Dimensions.get('screen')

const FullScreenModal: FC<IFullScreenModal> = ({ children, visible, onRequestClose }) => {

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <View style={styles.view}>
                { children }
            </View>
        </Modal>
    )
}
  
export default FullScreenModal
  
const styles = StyleSheet.create({
    view: {
        backgroundColor: '#FFF',
        height: height,
        width: width,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
    }
})