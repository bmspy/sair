import React from "react";
import { Modal, View, Text, Pressable, FlatList, Image } from "react-native";
import { Icon } from "../../components";
import { colors, images } from "../../config";
import styles from "./styles";

export default class CommitPlane extends React.Component{

    constructor(props){
        super(props)
        this.state={
            index:0,
        }
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
                    <View style={styles.modalConetnt1}>
                       <Text style={styles.address}>{false?'  تم انشاء خطتك الشهرية بنجاح في انتظار اعتماد مدير الدائرة   ':'هذه الخطة معتمدة غير قابل للتعديل'}</Text>
                        <Icon name={'check'} type={'entypo'} size={20} reverse reverseColor={colors.white} color={colors.primary}/>
                        <Pressable onPress={()=> this.props.onRequestClose()} style={styles.btn}>
                            <Text style={styles.loginBtn}>  عودة للصفحة الرئيسية   </Text>
                        </Pressable>
                    </View>

                </View>

            </Modal>    
        )
    }

}