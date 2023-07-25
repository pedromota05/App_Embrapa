import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { colors } from "../constants/theme";
import * as Animatable from 'react-native-animatable'; 

const Preload = () => {
  return (
    <View style={styles.container}>
      <Animatable.Image 
        animation="zoomIn" 
        easing="linear" 
        style={styles.image}
        source={require("../../assets/images/logo-embrapa.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.light,
    },
    image: {
        width: '65%',
        height: 200,
        resizeMode: "contain",
    },
});

export default Preload;
