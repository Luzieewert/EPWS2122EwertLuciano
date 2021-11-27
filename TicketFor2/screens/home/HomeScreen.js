import React, {FC} from 'react';
import {Text, View} from 'react-native';

interface Props {}

const HomeScreen: FC<Props> = props => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Work in Progress.. </Text>
    </View>
  );
};

export default HomeScreen;
