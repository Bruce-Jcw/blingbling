import React, { Component, PropTypes } from 'react';
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

import {DETAIL_VIEW_URL} from '../constants/app-constant.js'

class ItemDetail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    fetch(`${DETAIL_VIEW_URL}/${this.props.id}`, {method: "GET"})
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)
        this.setState({
          isLoading: false,
          item: responseData
        });
      })
      .done();
  }

  render() {
    if (this.state.isLoading) {
      return <View style={styles.container}><Text>Loading...</Text></View>;
    }
    return (
      <View style={styles.container}>
        <Text>{this.state.item.name}</Text>
      </View>
    )
  }
}

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

module.exports = ItemDetail
