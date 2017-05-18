import React from 'react';
import Expo, { AppLoading, Font, Amplitude, Constants, Permissions, MapView } from 'expo';
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';





class MapScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
      header: null, 
      tabBarVisible: false
  });
  render(){
    return (
      <View style={{ flex: 1 }}>
        <MapView 
          style={{ flex: 1 }}
          region={{
            longitude: -122,
            latitude: 37,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
          }}
          showsUserLocation
          showsMyLocationButton
        >
          <MapView.Marker
            title={'Your Current Location'}
            pinColor='#000'
            coordinate={{ latitude: 37, longitude: -122 }}
          />
        </MapView>
      </View>
    ); 
  }
}

const ExploreScreen = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>props.navigation.navigate('map')}>
        <Text>GO TO MAP</Text>
      </TouchableOpacity>
    </View>
  );
}

// HomeNavigator
// =================================
const HomeNavigator = StackNavigator({
  home: {  screen: ExploreScreen },
  map: { screen: MapScreen },
  //filters: { screen: FiltersScreen },
  //shopDetail: {  screen: ShopDetail },
},{
  tabBarLabel: 'Home',
  mode: 'modal'
});

// AppNavigator
// =================================
const MAIN_NAVIGATOR_OPTIONS = {
  swipeEnabled: false,
  lazy: true,
  tabBarOptions: {
    style: {
      backgroundColor: '#fff',
      height: 60,
      marginTop: Platform.OS === 'android' ? 24 : 0,
    },
    labelStyle: {
      fontSize: 13,
    }
  }
};



const MAIN_NAVIGATOR_ROUTES = {
  home: { screen: HomeNavigator }
};

const MainNavigator = TabNavigator(MAIN_NAVIGATOR_ROUTES, MAIN_NAVIGATOR_OPTIONS);




class App extends React.Component {
  render() {
    return (
      <MainNavigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);
