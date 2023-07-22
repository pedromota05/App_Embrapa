import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { sizes, spacing } from "../constants/theme";

const ScreenHeader = ({mainTitle, secondTitle}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.mainTitle}>{mainTitle}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.l,
        paddingVertical: spacing.l,
    },
    mainTitle: {
        fontSize: sizes.title,
        fontWeight: 'bold'
    },
});

export default ScreenHeader;