import React from "react";
import {TouchableWithoutFeedback, View, StyleSheet, Image, Animated} from "react-native";
import { colors, shadow } from "../constants/theme";

const AddButton = ({opened, toggleOpened}) => {
    const animation = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(animation, {
            toValue: opened ? 1 : 0,
            duration: 300,
            friction: 2,
            useNativeDriver: false,
        }).start();
    }, [opened, animation]);

    const opacity = {
        opacity: animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0, 1],
        }),
    };

    return(
        <View style={styles.container}>
            <View style={styles.box}>
                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.item, opacity, {
                        transform: [
                            {
                                translateX: animation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, -60],
                            }),
                            },
                            {
                                translateY: animation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, -50],
                                }),
                            },
                        ],
                    },]}>
                        <Image source={require("../../assets/icons/Arrow_Down.png")} resizeMode="contain" style={styles.itemIcon}></Image>
                    </Animated.View>
                </TouchableWithoutFeedback>
                
                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.item, opacity, {
                        transform: [
                            {
                                translateY: animation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, -100],
                                }),
                            },
                        ],
                    },]}>
                        <Image source={require("../../assets/icons/Transactions.png")} resizeMode="contain" style={styles.itemIcon}></Image>
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.item, opacity, {
                        transform: [
                            {
                                translateX: animation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 60],
                            }),
                            },
                            {
                                translateY: animation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, -50],
                                }),
                            },
                        ],
                    },]}>
                        <Image source={require("../../assets/icons/Arrow_Top.png")} resizeMode="contain" style={styles.itemIcon}></Image>
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={toggleOpened} style={styles.addButton}>
                    <Animated.View style={[styles.addButtonInner, {
                        transform: [{
                            rotate: animation.interpolate({
                                inputRange: [0, 1],
                                outputRange: ["0deg", "45deg"],
                            })
                        }],
                    }]}>
                        <Image source={require("../../assets/icons/Add.png")} resizeMode="contain" style={styles.addButtonIcon}></Image>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        height: 0,
    },
    box: {
        position: 'relative',
        width: 56,
        height: 56,
        marginTop: -20,
    },  
    addButton: {
        shadowColor: shadow.dark,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    addButtonInner: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3a74b0',
        width: 56,
        height: 56,
        borderRadius: 30,
    },
    addButtonIcon: {
        width: 40,
        height: 40,
        tintColor: colors.white,
    },
    item: {
        position: 'absolute',
        top: 5,
        left: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3a74b0',
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    itemIcon: {
        width: 32,
        height: 32,
        tintColor: colors.white,
    },
})
export default AddButton;