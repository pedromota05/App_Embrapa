import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import {useForm, Controller} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    email: yup.string().email("Email Inválido").required("Informe seu email"),
    password: yup.string().min(6, "A senha deve ter pelo menos 6 digitos").required("Informe sua senha"),
});

const LoginScreen = () => {
    const navigation = useNavigation();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    function handleSingIn(data){
        console.log(data);
    }

    function handleSignInAndNavigate(data) {
        handleSingIn(data);
        navigation.navigate('Home');
    }

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" useNativeDriver={false} delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem Vindo(a)</Text>
        <Text style={styles.message2}>Para aproveitar todas as funcionalidades do app Embrapa, faça o Login</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Controller
            control={control}
            name="email"
            defaultValue=""
            render={({ field: { onChange, onBlur, value } }) => (
                <>
                    <Text style={styles.title}>Email</Text>
                    <TextInput
                        placeholder="Digite um email..."
                        style={[
                            styles.input,{
                                borderWidth: errors.email && 1,
                                borderColor: errors.email && '#ff375b',
                            }]}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                    />
                </>
            )}
        />
        {errors.email && <Text style={styles.error}>{errors.email?.message}</Text>}

        <Controller
            control={control}
            name="password"
            defaultValue=""
            render={({ field: { onChange, onBlur, value } }) => (
                <>
                    <Text style={styles.title}>Senha</Text>
                    <TextInput 
                        placeholder="Digite sua senha..." 
                        style={[
                            styles.input,{
                                borderWidth: errors.password && 1,
                                borderColor: errors.password && '#ff375b',
                            }]}
                        value={value} 
                        onChangeText={onChange} 
                        onBlur={onBlur}
                        secureTextEntry={true}
                        underlineColorAndroid="transparent"
                        selectTextOnFocus={false}>
                    </TextInput>
                </>
            )}
        />
        {errors.password && <Text style={styles.error}>{errors.password?.message}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSubmit(handleSignInAndNavigate)}>
            <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('SingUp')}>
            <Text style={styles.registerText}>Nao possui uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef',
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#00264c',
    },
    message2: {
        fontSize: 14,
        marginTop: 5,
        marginRight: 15,
    },
    containerForm: {
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    title: {
        fontSize: 20,
        fontWeight: 500,
        marginTop: 28,
        color: '#00264c',
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#3a74b0',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center',
    },
    registerText: {
        color: '#a1a1a1',
    },
    error: {
        alignSelf: 'flex-start',
        color: '#ff375b',
        marginBottom: 8,
    },
});

export default LoginScreen;