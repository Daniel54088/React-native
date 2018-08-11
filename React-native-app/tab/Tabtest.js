import React from 'react';
import { View, StyleSheet, Dimensions ,Text} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';



    const FirstRoute = () => (
      <View style={[styles.scene, { backgroundColor: '#ff4081' }]}>
        <Text>first</Text>
      </View>
    );

    const SecondRoute = () => (
      <View style={[styles.scene, { backgroundColor: '#673ab7' }]} >
        <Text>Second</Text>
      </View>
    );



export default class Tabtest extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        index: 0,
        routes: [
          { key: 'first', title: 'First' },
          { key: 'second', title: 'Second' },

        ],
      }
  }

  _handleIndexChange = index => this.setState({ index });

  _renderTabBar = props => <TabBar {...props} style={styles.header} />;

  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  render() {



      return (
        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
          initialLayout={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
          }}
        />
      );
    }
  }

  const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  header: {

  },
});
