import React from 'react'
import { Text, View, ScrollView, StyleSheet, Image, Dimensions } from 'react-native'


function SongDetails({ route }) {
  const { item } = route.params;

  const convertToMinutes = (millis) => {
    return Math.floor((millis / 1000) / 60);
  }

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode='contain'
          style={styles.image}
          source={{ uri: item.artworkUrl100 }} />
      </View>
      <View style={styles.detailsContainer}>
        {item.trackName && <Text style={styles.trackName}>Track name : {item.trackName}</Text>}
        {(!item.trackName || !item.hasOwnProperty('trackName')) && <Text style={styles.trackName}>Track name : N/A</Text>}

        {item.artistName && <Text style={styles.normalText}>Artist Name : {item.artistName}</Text>}
        {(!item.artistName || !item.hasOwnProperty('artistName')) && <Text style={styles.normalText}>Artist Name : N/A</Text>}

        {item.trackTimeMillis && <Text style={styles.normalText}>Duration : {convertToMinutes(item.trackTimeMillis)} min</Text>}
        {(!item.trackTimeMillis || !item.hasOwnProperty('trackTimeMillis')) && <Text style={styles.normalText}>Duration : N/A</Text>}

        <Text style={styles.description}>
          {item.longDescription}
        </Text>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10
  },

  image: {
    height: 150,
    width: '100%',
    borderRadius: 5
  },

  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  detailsContainer: {
    padding: 10
  },

  trackName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#666',
    marginBottom: 5
  },

  normalText: {
    fontSize: 15,
    color: '#666',
    marginBottom: 5
  },

  description: {
    color: '#666',
    fontSize: 16,
    textAlign: 'justify'
  }
})

export default SongDetails
