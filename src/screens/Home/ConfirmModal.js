import React from "react";
import { Modal, View, Text, Pressable } from "react-native";
import { Icon } from "../../components";
import { colors } from "../../config";
import styles from "./styles";

export default class ConfirmModal extends React.Component{

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
                    <View style={styles.modalConetnt}>
                   
                <Pressable onPress={()=> this.props.onAddNote()} style={this.state.index == 1 ? styles.itemViewActive:styles.itemView}>
                    <Icon name={'tasks'} type={'font-awesome'} size={18} />
                    <Text style={styles.address}>   اضافة ملاحظات    </Text>
                    {/* {this.state.index == 1 &&<Icon name={'check'}  type={'AntDesign'} color={colors.primary} />} */}
                    </Pressable>

                <Pressable onPress={()=> this.setState({index:1})} style={this.state.index == 1 ? styles.itemViewActive:styles.itemView}>
                    <Icon name={'edit'} type={'feather'} size={18} />
                    <Text style={styles.address}>   تعديل الخطة   </Text>
                    {/* {this.state.index == 1 &&<Icon name={'check'}  type={'AntDesign'} color={colors.primary} />} */}
                    </Pressable>

                <Pressable onPress={()=> this.props.onRequestClose()} style={this.state.index == 2 ? styles.itemViewActive:styles.itemView}>
                    {/* <Icon name={'hand-o-up'} type={'font-awesome'} size={18} color={'#D8702B'}/> */}
                    <Text style={[styles.address,{color:'#FF0000'}]}>  رجوع   </Text>
                    {/* {this.state.index == 2 &&<Icon name={'check'}  type={'AntDesign'} color={colors.primary} />} */}
                    </Pressable>
                    </View>

                </View>

            </Modal>    
        )
    }

}