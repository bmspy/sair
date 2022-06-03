import {ActivityIndicator, Modal, Text, View} from 'react-native';
import {colors} from '../../config';
import React from 'react';
import commonStyle from '../../styles/common.style';
export  default function LoadingModal({message, loading}: {message: string, loading: boolean}) {
  return (
    <Modal
      visible={loading}
      style={{
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        backgroundColor: 'orange',
      }}
      transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,.5)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '80%',
            height: '30%',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, color: 'black'}}>{message}</Text>
          <ActivityIndicator
            style={{marginTop: 15, marginBottom: 15}}
            animating={true}
            size={'large'}
            color={colors.primary}
          />
          {/*<Pressable*/}
          {/*  style={{*/}
          {/*    width: '80%',*/}
          {/*    height: 45,*/}
          {/*    backgroundColor: colors.primary,*/}
          {/*    borderRadius: 20,*/}
          {/*  }}>*/}
          {/*  {}*/}
          {/*</Pressable>*/}
        </View>
      </View>
    </Modal>
  );
}

// Developed by Mustafa Alabadla
