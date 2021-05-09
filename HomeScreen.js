import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';

function HomeScreen({ navigation }) {
  let i = 0;
  let [playlist, setPlayList] = useState(() => []);
  let [refreshing, setRefreshing] = useState(() => false);

  useEffect(() => {
    async function getList() {
      let _list = await fetch('https://itunes.apple.com/search?term=Michael+jackson');
      let list = await _list.json();
      setPlayList(list.results);
      setRefreshing(false);
    };
    getList();

  }, [refreshing]);

  const convertToMinutes = (millis) => {
    return Math.floor((millis / 1000) / 60);
  }

  const onRefresh = () => {
    setRefreshing(true);
    setPlayList([]);
  }

  const navigate = (item) => {
    navigation.navigate('Song Details', { item });
  }

  if (playlist.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#123744" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        refreshing={refreshing}
        data={playlist}
        keyExtractor={item => `${item.trackId}${i++}`}
        showsHorizontalScrollIndicator={false}
        onRefresh={() => onRefresh()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigate(item)}
              style={styles.item}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{ uri: item.artworkUrl100 }}
                  resizeMode='stretch'
                />
              </View>
              <View>
                {item.trackName && <Text style={styles.trackName}>{item.trackName}</Text>}
                {(!item.trackName || !item.hasOwnProperty('trackName')) && <Text style={styles.trackName}>N/A</Text>}

                {item.artistName && <Text style={styles.normalText}>Artist Name : {item.artistName}</Text>}
                {(!item.artistName || !item.hasOwnProperty('artistName')) && <Text style={styles.normalText}>Artist Name : N/A</Text>}

                {item.trackTimeMillis && <Text style={styles.normalText}>Duration : {convertToMinutes(item.trackTimeMillis)} min</Text>}
                {(!item.trackTimeMillis || !item.hasOwnProperty('trackTimeMillis')) && <Text style={styles.normalText}>Duration : N/A</Text>}
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  item: {
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },

  image: {
    height: 80,
    width: 80
  },

  trackName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#666',
    marginBottom: 5
  },

  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },

  normalText: {
    fontSize: 15,
    color: '#666',
    marginBottom: 5
  }
})

export default HomeScreen;
