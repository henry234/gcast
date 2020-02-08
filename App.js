/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const data = require('./src/data/data.json');
import IMAGES from './src/assets';

const App = () => {
  const mapView = React.createRef();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <MapView
            ref={mapView}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            showsMyLocationButton={true}
            region={{
              latitude: 10.78834,
              longitude: 106.6947552,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            {data.map(item => (
              <Marker key={item.img} coordinate={item.coords}>
                <View
                  style={{
                    backgroundColor: 'red',
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}>
                  <Image
                    style={{width: 20, height: 20}}
                    source={IMAGES[item.img]}
                  />
                </View>
              </Marker>
            ))}
          </MapView>
        </View>
        <FlatList
          style={{position: 'absolute', bottom: 20}}
          data={data}
          renderItem={({item, index, separators}) => (
            <TouchableOpacity
              key={item.img}
              style={{
                width: 150,
                height: 50,
                borderRadius: 25,
                flexDirection:'row',
                alignItems:'center',
                overflow: 'hidden',
                marginHorizontal: 10,
                backgroundColor: 'rgba(0,0,0,0.3)',
              }}
              
              onPress={() => {
                mapView.current.animateCamera({center: item.coords}, 1000);
              }}>
              <Image
                style={{width: 50, height: 50}}
                source={IMAGES[item.img]}
              />
              <Text style={{marginLeft:5, color:'royalblue'}}>Actor name</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.img}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default App;
