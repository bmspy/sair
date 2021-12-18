import React from "react";
import { Modal, View, Text, Pressable, FlatList, Image } from "react-native";
import { Icon } from "../../components";
import { colors, images } from "../../config";
import styles from "./styles";

export default class GoMethod extends React.Component{

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
                        <Text style={styles.address1}>  طريقة الذهاب   </Text>
                        <View style={styles.GoMethodView}>
                            <Pressable onPress={()=>this.props.onRequestCChoose('سائق')} style={styles.driver_btn}>
                                <Text style={styles.driver_txt}>سائق</Text>
                            </Pressable>
                            <Pressable onPress={()=>this.props.onRequestCChoose('سيارة خاصة')} style={styles.special_car}>
                                <Text style={styles.special_car_txt}>سيارة خاصة</Text>
                            </Pressable>
                        </View>
                    </View>

                </View>

            </Modal>    
        )
    }

}