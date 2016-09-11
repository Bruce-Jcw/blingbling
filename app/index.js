/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import ImagePicker from 'react-native-image-crop-picker';

import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  ListView,
  TouchableHighlight,
  View,
  AlertIOS,
  Image,
  NavigatorIOS
} from 'react-native';

import ItemList from './components/ItemList'
import ItemDetail from './components/ItemDetail'
import ItemNew from './components/ItemNew'

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.add = this.add.bind(this)
  }

  render() {
    return (
      <NavigatorIOS
        ref='nav'
        initialRoute={{
          component: ItemList,
          title: '首页',
          rightButtonTitle: '+',
          onRightButtonPress: this.add
        }}
        style={{flex: 1}}
      />
    )
  }

  add(navigator) {
    this.refs.nav.push({
      title: '新建',
      component: ItemNew
    });
  }

}//end of class

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingTop: 66
  },
  mediaItem: {
    flexDirection:'row',
    marginBottom: 20
  },
  media:{
    flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
  image: {
    height:40,
		width:40,
		resizeMode:Image.resizeMode.contain
  },
  mediaBody: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  mediaText: {
    marginBottom: 10,
  },
  mediaTextLast: {
    marginBottom: 0
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
    marginBottom: 80
  },
  add: {
    flex: 0,
    borderWidth: 1,
    padding: 20,
    borderStyle: 'dashed',
    justifyContent: 'center'
  }
});

module.exports = App
