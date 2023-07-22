import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import TabContainer from "../components/TabContainer";
import Logo from "../../assets/images/logo-embrapa.png";
import { useNavigation } from "@react-navigation/native";

const UserScreen = () => {
    const navigation = useNavigation();
    return (
        <TabContainer>
            <View style={styles.container}>
                <View style={styles.containerLogo}>
                    <Animatable.Image 
                        animation="flipInY"
                        source={Logo}
                        style={{ width: '65%', height: '90%' }}
                        resizeMode="contain"></Animatable.Image>
                </View>
                <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
                    <Text style={styles.title}>Esta área é exclusivamente de uso interno da Empresa</Text>
                    <Text style={styles.text}>Faça o login para começar</Text>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.buttonText}>Acessar</Text>
                        </TouchableOpacity>
                </Animatable.View>
            </View>
        </TabContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef',
    },
    containerLogo: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#efefef',
        height: '50%',
    },
    containerForm: {
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
        marginBottom: 50,
        backgroundColor: '#fff',
        height: '50%',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12,
    },
    text: {
        color: '#a1a1a1',
    },
    button: {
        position: 'absolute',
        backgroundColor: '#3a74b0',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        bottom: '15%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    buttonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: 'bold',
    }
});

export default UserScreen;