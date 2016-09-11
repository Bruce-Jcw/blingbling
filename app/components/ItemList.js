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

import ItemDetail from './ItemDetail'
import {LIST_VIEW_URL} from '../constants/app-constant.js'

class ItemList extends Component {

  constructor(props, context) {
    super(props, context);
    this._onForward = this._onForward.bind(this);
    this._renderRow = this._renderRow.bind(this);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    fetch(LIST_VIEW_URL, {method: "GET"})
      .then((response) => response.json())
      .then((responseData) => {
        for (var i = 0; i < responseData.length; i++) {
          responseData[i].id = responseData[i].id.toString()
          responseData[i].name = responseData[i].name.toString()
        }
        console.log(responseData)
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseData)
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
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      </View>
    )
  }

  _onForward(id, name) {
    this.props.navigator.push({
      title: name,
      passProps: {id: id},
      component: ItemDetail
    });
  }

  _renderRow(rowData) {
    return (
      <TouchableHighlight onPress={ () => this._onForward(rowData.id, rowData.name)} style={styles.flex}>
        <View style={styles.mediaItem}>
          <View style={styles.flex}>
            <View style={[styles.media]}>
              <Image style={[styles.image]} source={{uri:rowData.image}}></Image>
            </View>
          </View>
          <View style={styles.mediaBody}>
              <Text style={styles.mediaText}>周边33336666</Text>
              <Text style={[styles.mediaText, styles.mediaTextLast]}>海外1111</Text>
          </View>
        </View>
      </TouchableHighlight>
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

module.exports = ItemList
