import React, { useState } from 'react';
import { View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';


const HomeScreen = () => {
    const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={() => navigation.navigate('MapScreen')}>

          </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
