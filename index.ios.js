/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
// import ImagePicker from 'react-native-image-crop-picker';

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

class ItemDetail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    fetch(`http://localhost:8777/${this.props.id}`, {method: "GET"})
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

class ItemNew extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this.openCamera.bind(this)}>camera</Text>
      </View>
    )
  }

  openCamera() {
    // ImagePicker.openPicker({
    //   multiple: true
    // }).then(images => {
    //   console.log(images);
    // });
  }

}

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
    fetch("http://localhost:8777", {method: "GET"})
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
              <Text style={styles.mediaText}>周边</Text>
              <Text style={[styles.mediaText, styles.mediaTextLast]}>海外</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

}

class blingbling extends Component {

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
  }
});

AppRegistry.registerComponent('blingbling', () => blingbling);
