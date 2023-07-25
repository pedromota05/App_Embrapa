import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TextInput, StyleSheet, ActivityIndicator, FlatList, Image } from 'react-native';
import TabContainer from "../components/TabContainer";
import MainHeader from "../components/MainHeader";
import { PLACES } from "../data";
import { colors, shadow, spacing } from "../constants/theme";
import filter from 'lodash.filter';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

const API_ENDPOINT = `https://randomuser.me/api/?results=30`;

const SearchScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [fullData, setFullData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setIsLoading(true);
        fetchData(API_ENDPOINT);
    }, []);

    const fetchData = async(url) => {
        try{
            const response = await fetch(url);
            const json = await response.json();
            setData(json.results);

            console.log(json.results);

            setFullData(json.results);

            setIsLoading(false);
        } catch(error) {
            setError(error);
            console.log(error);
            setIsLoading(false);
        }
    }

    const handleSearch = (query) => {
        setSearchQuery(query);
        const formattedQuery = query.toLowerCase();
        const filteredData = filter(fullData, (user) => {
            return contains(user, formattedQuery);
        });
        setData(filteredData);
    }

    const contains = ({name, email}, query) => {
        const {first, last} = name;

        if(first.includes(query) || last.includes(query) || email.includes((query))){
            return true;
        }

        return false;
    }

    if(isLoading){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={'large'} color='#3a74b0'></ActivityIndicator>
            </View>
        )
    }

    if(error){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Error in fetching data ... Please check your internet connection!</Text>
            </View>
        )
    }

    return (
        <TabContainer>
            <MainHeader list={PLACES}></MainHeader>
                <SafeAreaView style={{flex: 1, marginHorizontal: 20}}>
                    <View style={styles.container}>
                        <View style={styles.inner}>
                            <View style={styles.iconSearch} pointerEvents="none">
                                <AntDesign name="search1" size={20} color="black" />
                            </View>
                            <TextInput 
                                placeholder="Search" 
                                clearButtonMode="always" 
                                style={styles.inputSearch} 
                                autoCapitalize="none" 
                                autoCorrect={false} 
                                onChangeText={(query) => handleSearch(query)}>
                            </TextInput>
                            <View style={styles.field}>
                                <Ionicons name="ios-filter" size={20} color="black" onPress={() => {}}/>
                            </View>
                        </View>
                    </View>
                    <FlatList 
                        data={data}
                        keyExtractor={(item) => item.login.username}
                        renderItem={({item}) => (
                            <View style={styles.itemContainer}>
                                <Image source={{uri: item.picture.thumbnail}} style={styles.image}></Image>
                                <View>
                                    <Text style={styles.textName}>{item.name.first} {item.name.last}</Text>
                                    <Text style={styles.textEmail}>{item.email}</Text>
                                </View>
                            </View>
                        )}>
                    </FlatList>
                </SafeAreaView>
        </TabContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: spacing.m,
        paddingBottom: spacing.l / 1.5,
    },
    inner:{
        flexDirection: "row",
    },
    inputSearch: {
        backgroundColor: '#fff',
        paddingLeft: spacing.xl + spacing.s,
        paddingRight: spacing.m,
        paddingVertical: spacing.m,
        borderRadius: 8,
        height: 54,
        flex: 1,
        ...shadow.light,
        borderColor: '#ccc',
        borderWidth: 0.3,
    },
    iconSearch: {
        position: 'absolute',
        top: 17,
        left: 17,
        zIndex: 1,
    },
    field: {
        position: 'absolute',
        top: 17,
        right: 17,
        zIndex: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 15,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    textName: {
        fontSize: 17,
        marginLeft: 10,
        fontWeight: "600",
    },
    textEmail: {
        fontSize: 14,
        marginLeft: 10,
        color: 'grey',
    },
})

export default SearchScreen;