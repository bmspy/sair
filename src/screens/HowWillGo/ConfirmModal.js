import React from "react";
import { Modal, View, Text, Pressable } from "react-native";
import styles from "./styles";

export default class ConfirmModal extends React.Component{

    constructor(props){
        super(props)
    
    }

    render(){
        return(
            <Modal visible={this.props.visible}
                   onRequestClose={() => this.props.onRequestClose()}
                   ref={"modal"}
                   animationType="slide"
                    transparent={true}
                    useNativeDriver={true}
                    animationInTiming={700}
                    animationOutTiming={700}
                >
                <View style={styles.modalContainer}>
                    <View style={styles.modalConetnt}>
                        <Text style={styles.address}>يرجى اكمال خطتك لتتمكن من استعراضها</Text>
                        <View style={styles.consultantView1}>
                                    <Pressable onPress={() => this.props.onRequestClose()} style={styles.palneView}>
                                        <Text style={styles.monthText1}>تجاهل </Text>
                                    </Pressable>
                                    <Pressable style={styles.palneView1}>
                                        <Text style={styles.monthText2}>إضافة خطة</Text>
                                    </Pressable>
                                </View>
                    </View>

                </View>

            </Modal>    
        )
    }

}