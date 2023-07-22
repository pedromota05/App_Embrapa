import React from "react";
import { View, Text } from 'react-native';
import TabContainer from "../components/TabContainer";
import MainHeader from "../components/MainHeader";
import { PLACES } from "../data";

const FavoriteScreen = () => {
    return (
        <TabContainer>
            <MainHeader list={PLACES}></MainHeader>
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text>Favorite ❤️</Text>
            </View> 
        </TabContainer>
    )
}

export default FavoriteScreen;