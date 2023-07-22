import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { colors } from "../constants/theme";
import MainHeader from "../components/MainHeader";
import TopPlacesCarousel from "../components/TopPlacesCarousel";
import Cards from "../components/Cards";
import { PLACES } from "../data";
import TabContainer from "../components/TabContainer";
import { Localization } from "../components/Localization";

const HomeScreen = () => {
    return (
        <TabContainer>
            <View style={styles.container}>
                <MainHeader list={PLACES}></MainHeader>
                <ScrollView>
                    <SafeAreaView>
                        <TopPlacesCarousel></TopPlacesCarousel>
                    </SafeAreaView>
                    <Cards></Cards>
                    <Localization></Localization>
                </ScrollView>
            </View>
        </TabContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light,
    }
})
export default HomeScreen;