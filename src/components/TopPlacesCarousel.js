import React from "react";
import { StyleSheet, View, Text, Image, Dimensions, Animated } from "react-native";
import Carousel, { Pagination } from 'react-native-x-carousel';

const TopPlacesCarousel = () => {
  const DATA = [
    {
      coverImageUri: require('../../assets/images/carousel1.png'),
    },
    {
      coverImageUri: require('../../assets/images/carousel2.png'),
    },
    {
      coverImageUri: require('../../assets/images/carousel3.png'),
    },
  ];

  const renderItem = (data, index) => (
    <View key={index} style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <Animated.Image style={styles.card} source={data.coverImageUri} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        pagination={Pagination}
        renderItem={renderItem}
        data={DATA}
        loop
        autoplay
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 400,
    },
    cardWrapper: {
        borderRadius: 3,
        overflow: 'hidden',
    },
    card: {
        width: 400 * 0.9,
        height: 320 * 0.5,
        marginTop: 20,
        resizeMode: "stretch",
    },
});

export default TopPlacesCarousel;
