import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useTabMenu } from "../context/TabContext";
import { colors } from "../constants/theme";

const TabContainer = ({ children }) => {
  const { opened } = useTabMenu();
  const animation = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: opened ? 1 : 0,
      duration: 300,
      friction: 2,
      useNativeDriver: false,
    }).start();
  }, [opened, animation]);

  return (
    <View style={styles.container}>
      {children}
      {opened && (
        <Animated.View
          style={[
            styles.overlay,
            {
              backgroundColor: animation.interpolate({
                inputRange: [0, 1],
                outputRange: ["transparent", colors.black], // Make sure colors.dark is a valid color value
              }),
            },
          ]}
        ></Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    opacity: 0.2,
  },
});

export default TabContainer;
