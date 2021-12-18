import React from "react";
import { Modal, View, Text, Pressable, FlatList, Image } from "react-native";
import { Icon } from "../../components";
import { colors, images } from "../../config";
import styles from "./styles";

export default class ChooseLocation extends React.Component{

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
                    <View style={styles.itemViewActive}>
                        <Pressable onPress={()=> this.props.onRequestClose()} >
                            <Icon name={'close'} type={'font-awesome'} size={18} color={colors.dimGray} />
                        </Pressable>
                        <Text style={styles.address}>  تحديد المكان   </Text>
                        <View/>
                </View>

                <FlatList data={[{},{},{}]}
                          horizontal
                          style={{alignSelf:'center',marginTop:'5%'}}
                          renderItem={(item) => {
                              return(
                                  <Pressable onPress={()=>this.setState({index:item.index})}
                                   style={[styles.schools,{borderColor:this.state.index == item.index ? colors.primary:'transparent',borderWidth:this.state.index == item.index ?1:0}]}>
                                      <Image source={images.avatar}/>
                                      <Text style={styles.hello}>مدارس البريمي</Text>
                                  </Pressable>
                              )
                          }}
                />

                        <Pressable onPress={()=> this.props.onRequestClose()} style={styles.btn}>
                            <Text style={styles.loginBtn}>  اختيار   </Text>
                        </Pressable>
                    </View>

                </View>

            </Modal>    
        )
    }

}