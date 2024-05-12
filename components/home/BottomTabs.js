import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { Image } from 'react-native-elements';

export const bottomTabIcons = [
  {
    name: 'Home',
    imageUrl: require('../../assets/home.jpg')
  },
  {
    name: 'Search',
    imageUrl: require('../../assets/search.jpg')
  },
  {
    name: 'profile',
    imageUrl: require('../../assets/profile.jpg')
  },
];

const BottomTabs = ({ icons }) => {
  const [activeTab, setActiveTab] = useState('Home');
  const Icon = ({ icon }) => (
    <TouchableOpacity >
      <Image source={icon.imageUrl} style={styles.icon} />
    </TouchableOpacity>
  );
  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    paddingTop: 10
  },
  icon: {
    width: 30,
    height: 30
  }
});

export default BottomTabs;
